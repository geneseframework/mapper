import { TypeDeclarationKindEnum } from '../../enums/type-declaration-kind.enum';
import { GLOBAL } from '../../const/global.const';
import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    IndexSignatureDeclaration,
    IndexSignatureDeclarationStructure,
    InterfaceDeclaration,
    SourceFile,
    SyntaxKind,
    TypeAliasDeclaration, TypeNode
} from 'ts-morph';
import { Declaration, DeclarationOrDate } from '../../types/type-declaration.type';
import { throwWarning } from '../errors.util';
import { flat } from '../native/arrays.util';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { StringOrNumber } from '../../types/string-or-number.type';
import { DateDeclaration } from '../../models/date-declaration.model';
import { isPrimitiveTypeNode } from '../native/primitives.util';
import { Property } from '../../types/target/property.type';
import * as chalk from 'chalk';
import { ClassOrInterfaceInfo } from '../../types/class-or-interface-info.type';
import { DeclarationInfoService } from '../../services/init/declaration-info.service';
import { TypeDeclarationKind } from '../../types/type-declaration-kind.type';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';
import { CheckTargetsService } from '../../services/init/check-targets.service';


const getDescendantClasses = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.ClassDeclaration);
const getDescendantEnums = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.EnumDeclaration);
const getDescendantInterfaces = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration);
const getDescendantTypeAliases = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration);


export function getDeclarationKind(typeDeclaration: DeclarationOrDate): TypeDeclarationKind {
    if (!typeDeclaration) {
        return undefined;
    } else if (typeDeclaration instanceof ClassDeclaration) {
        return 'Class';
    } else if (typeDeclaration instanceof EnumDeclaration) {
        return 'Enum';
    } else if (typeDeclaration instanceof InterfaceDeclaration) {
        return 'Interface';
    } else if (typeDeclaration instanceof TypeAliasDeclaration) {
        return 'TypeAlias';
    }
}


export function getTypeDeclaration(typeName: string): DeclarationOrDate {
    const typeDeclarationKind: TypeDeclarationKindEnum = declarationKind(typeName);
    switch (typeDeclarationKind) {
        case TypeDeclarationKindEnum.CLASS_DECLARATION:
            return getDeclaration(typeName, getDescendantClasses);
        case TypeDeclarationKindEnum.ENUM_DECLARATION:
            return getDeclaration(typeName, getDescendantEnums);
        case TypeDeclarationKindEnum.INTERFACE_DECLARATION:
            return getDeclaration(typeName, getDescendantInterfaces);
        case TypeDeclarationKindEnum.TYPE_ALIAS_DECLARATION:
            return getDeclaration(typeName, getDescendantTypeAliases);
        default:
            const typeScriptDeclaration: DeclarationOrDate = getTypeScriptDeclaration(typeName);
            if (typeScriptDeclaration) {
                return typeScriptDeclaration;
            } else {
                throwWarning(`impossible to find declaration corresponding to "${typeName}".`);
                return undefined;
            }
    }
}


export function hasDeclaration(typeName: string): boolean {
    return !!declarationKind(typeName);
}


function declarationKind(typeName: string): TypeDeclarationKindEnum {
    // console.log(chalk.redBright('DECL KINDDDDD'), GLOBAL.declarationInfos.length, isClassDeclaration(typeName));
    if (isClassDeclaration(typeName)) {
        return TypeDeclarationKindEnum.CLASS_DECLARATION;
    } else if (isEnumDeclaration(typeName)) {
        return TypeDeclarationKindEnum.ENUM_DECLARATION;
    } else if (isInterfaceDeclaration(typeName)) {
        return TypeDeclarationKindEnum.INTERFACE_DECLARATION;
    } else if (isTypeAliasDeclaration(typeName)) {
        return TypeDeclarationKindEnum.TYPE_ALIAS_DECLARATION;
    } else {
        return undefined;
    }
}


export function isClassDeclaration(typeName: string): boolean {
    return GLOBAL.classNames.includes(typeName);
}


export function isEnumDeclaration(typeName: string): boolean {
    return GLOBAL.enumNames.includes(typeName);
}


export function isInterfaceDeclaration(typeName: string): boolean {
    return GLOBAL.interfaceNames.includes(typeName);
}


export function isTypeAliasDeclaration(typeName: string): boolean {
    return GLOBAL.typeNames.includes(typeName);
}


// TODO: Add imported classes in new instance generator file
export async function isDeclaredOutOfProjectAddItToGlobal(target: string): Promise<boolean> {
    const declarations: ImportDeclaration[] = getImportDeclarations(target);
    if (declarations.length === 0) {
        return false;
    } else if (declarations.length > 1) {
        throwWarning(`${target} is declared in multiple files.`);
        return true;
    } else {
        const importSourceFile: SourceFile = declarations[0].getModuleSpecifierSourceFile();
        const declaration: Declaration = addDeclarationInfoToGlobalDeclarationInfos(target, importSourceFile);
        await addRecursivelyDeclarationInfo(declaration);
        console.log(chalk.cyanBright('IS OOOOOP'));
        return true;
    }
}


function addDeclarationInfoToGlobalDeclarationInfos(target: string, importSourceFile: SourceFile): Declaration {
    let declaration: Declaration = getSourceFileDeclaration(target, importSourceFile, 'ClassDeclaration');
    if (declaration) {
        DeclarationInfoService.addClassInfo(declaration as ClassDeclaration, GLOBAL.classNames);
        return declaration;
    }
    declaration = getSourceFileDeclaration(target, importSourceFile, 'InterfaceDeclaration');
    if (declaration) {
        DeclarationInfoService.addInterfaceInfo(declaration as InterfaceDeclaration);
        return declaration;
    }
    declaration = getSourceFileDeclaration(target, importSourceFile, 'EnumDeclaration');
    if (declaration) {
        DeclarationInfoService.addEnumInfo(declaration as EnumDeclaration);
        return declaration;
    }
    declaration = getSourceFileDeclaration(target, importSourceFile, 'TypeAliasDeclaration');
    if (declaration) {
        DeclarationInfoService.addTypeInfo(declaration as TypeAliasDeclaration);
        return declaration;
    }
}


async function addRecursivelyDeclarationInfo(declaration: Declaration): Promise<void> {
    switch (getDeclarationKind(declaration)) {
        case 'Class':
        case 'Interface':
            await addDeclarationInfoForEachProperty(declaration as ClassOrInterfaceDeclaration);
        case 'Enum':
        // TODO
        case 'TypeAlias':
            await addDeclarationInfoForType(declaration as TypeAliasDeclaration);
    }
}


async function addDeclarationInfoForEachProperty(declaration: ClassOrInterfaceDeclaration): Promise<void> {
    for (const property of declaration.getProperties()) {
        await addDeclarationInfoForProperty(property);
    }
}


async function addDeclarationInfoForProperty(property: PropertyDeclarationOrSignature): Promise<void> {
    const propertyType: string = property.getStructure().type as string;
    if (propertyType === 'Level') {
        console.log(chalk.cyanBright('ADD DECL FOR PROPPPP'), property.getStructure(), property.getTypeNode().getKindName());
        console.log(chalk.magentaBright('ALL SRCFFFFFFFF'), property.getStructure(), property.getTypeNode().getKindName());
    }
    await CheckTargetsService.start(propertyType);
}


async function addDeclarationInfoForType(type: TypeAliasDeclaration): Promise<void> {
    const propertyType = type.getStructure();
    // const propertyType: string = type.getStructure().type as string;
    // console.log(chalk.magentaBright('ADDD DECL TYPE'), propertyType);
    // await CheckTargetsService.start(propertyType);
}


function getSourceFileDeclaration(name: string, sourceFile: SourceFile, kind: 'ClassDeclaration' | 'InterfaceDeclaration' | 'EnumDeclaration' | 'TypeAliasDeclaration'): Declaration {
    return sourceFile.getDescendantsOfKind(SyntaxKind[kind]).find(e => (e as Declaration).getName() === name) as Declaration;
}


// TODO: SEARCH Mapper.create and set declarationInfos including out of project
// TODO: Create a specific file for that ?
export function hasDeclarationOutOfProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => DeclarationOrDate[]): boolean {
    const declarations: ImportDeclaration[] = getImportDeclarations(typeName);
    if (declarations.length === 0) {
        return false;
    } else if (declarations.length > 1) {
        throwWarning(`${typeName} is declared in multiple files.`)
    } else {
        const importSourceFile: SourceFile = declarations[0].getModuleSpecifierSourceFile();
        if (getTDeclaration(importSourceFile)?.length > 0) {
            GLOBAL.project.addSourceFileAtPath(importSourceFile.getFilePath());
            return true;
        } else {
            return false;
        }
    }
    return !!GLOBAL.projectWithNodeModules.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()?.toLowerCase()).includes(typeName?.toLowerCase()));
}


function hasDeclarationInTypeScript(typeName: string): boolean {
    if (typeName === 'Date') {
        return true;
    }
    return undefined;
}


function getImportDeclarations(typeName: string): ImportDeclaration[] {
    const declarations: ImportDeclaration[] = flat(GLOBAL.projectWithNodeModules.getSourceFiles().map(s => s.getImportDeclarations()));
    const declarationsWithSameName: ImportDeclaration[] = declarations.filter(i => i.getNamedImports().find(n => n.getName() === typeName));
    return groupByImportPath(declarationsWithSameName);
}


function groupByImportPath(declarations: ImportDeclaration[]): ImportDeclaration[] {
    const importDeclarations: ImportDeclaration[] = [];
    for (const declaration of declarations) {
        if (!importDeclarations.map(d => d.getModuleSpecifierSourceFile()?.getFilePath()).includes(declaration.getModuleSpecifierSourceFile().getFilePath())) {
            importDeclarations.push(declaration);
        }
    }
    return importDeclarations;
}


function getDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => DeclarationOrDate[]): DeclarationOrDate {
    if (hasDeclarationInTypeScript(typeName)) {
        return getTypeScriptDeclaration(typeName);
    }
    let sourceFile: SourceFile = getDeclarationSourceFileInProject(typeName, getTDeclaration);
    return getTDeclaration(sourceFile).find(t => t.getName() === typeName);
}


function getDeclarationSourceFileInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => DeclarationOrDate[]): SourceFile {
    return GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function getTypeScriptDeclaration(typeName: string): DeclarationOrDate {
    if (typeName === 'Date') {
        return new DateDeclaration();
    }
    return undefined;
}


export function indexSignatureWithSameType(key: StringOrNumber, value: any, declaration: ClassOrInterfaceDeclaration): string {
    const indexSignatures: IndexSignatureDeclaration[] = declaration.getDescendantsOfKind(SyntaxKind.IndexSignature);
    if (indexSignatures.length === 0) {
        return undefined;
    } else if (indexSignatures.length === 1) {
        return indexSignatureName(key, value, indexSignatures[0]);
    } else {
        throwWarning(`${declaration?.getName()} has multiple index signatures.`);
        return undefined;
    }
}


function indexSignatureName(key: StringOrNumber, value: any, indexSignature: IndexSignatureDeclaration): string {
    const indexStructure: IndexSignatureDeclarationStructure = indexSignature?.getStructure();
    if (indexStructure.keyType !== typeof key) {
        return undefined;
    }
    const returnType: string = indexStructure.returnType as string;
    if (isPrimitiveTypeNode(returnType) && returnType === typeof value) {
        return returnType;
    }
    if (!isPrimitiveTypeNode(returnType) && value?.constructor.name === returnType) {
        return returnType;
    }
    return undefined;
}


export function isProperty(propertyName: string, declaration: ClassOrInterfaceInfo): boolean {
    return !!declaration.properties.find(p => p.name === propertyName);
}


export function getProperties(declaration: ClassOrInterfaceDeclaration): Property[] {
    return declaration?.getStructure().properties.map(p => {
        return {name: p.name, type: p.type, initializer: p.initializer, isRequired: !p.hasQuestionToken} as Property;
    });
}

