import { TypeDeclarationKind } from '../../enums/type-declaration.kind';
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
    TypeAliasDeclaration
} from 'ts-morph';
import { Declaration } from '../../types/type-declaration.type';
import { throwWarning } from '../errors.util';
import { flat } from '../native/arrays.util';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { StringOrNumber } from '../../types/string-or-number.type';
import { DateDeclaration } from '../../models/date-declaration.model';
import { isPrimitiveTypeNode } from '../native/primitives.util';
import { Property } from '../../types/target/property.type';
import * as chalk from 'chalk';
import { IndexableType } from '../../types/indexable-type.type';
import { ClassOrInterfaceInfo } from '../../types/class-or-interface-info.type';


const getDescendantClasses = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.ClassDeclaration);
const getDescendantEnums = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.EnumDeclaration);
const getDescendantInterfaces = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration);
const getDescendantTypeAliases = (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration);


export function getDeclarationKind(typeDeclaration: Declaration): TypeDeclarationKind {
    if (!typeDeclaration) {
        return undefined;
    } else if (typeDeclaration instanceof ClassDeclaration) {
        return TypeDeclarationKind.CLASS_DECLARATION;
    } else if (typeDeclaration instanceof EnumDeclaration) {
        return TypeDeclarationKind.ENUM_DECLARATION;
    } else if (typeDeclaration instanceof InterfaceDeclaration) {
        return TypeDeclarationKind.INTERFACE_DECLARATION;
    } else if (typeDeclaration instanceof TypeAliasDeclaration) {
        return TypeDeclarationKind.TYPE_ALIAS_DECLARATION;
    }
}


export function getTypeDeclaration(typeName: string): Declaration {
    const typeDeclarationKind: TypeDeclarationKind = declarationKind(typeName);
    switch (typeDeclarationKind) {
        case TypeDeclarationKind.CLASS_DECLARATION:
            return getDeclaration(typeName, getDescendantClasses);
        case TypeDeclarationKind.ENUM_DECLARATION:
            return getDeclaration(typeName, getDescendantEnums);
        case TypeDeclarationKind.INTERFACE_DECLARATION:
            return getDeclaration(typeName, getDescendantInterfaces);
        case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
            return getDeclaration(typeName, getDescendantTypeAliases);
        default:
            const typeScriptDeclaration: Declaration = getTypeScriptDeclaration(typeName);
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


function declarationKind(typeName: string): TypeDeclarationKind {
    // console.log(chalk.redBright('DECL KINDDDDD'), GLOBAL.declarationInfos.length, isClassDeclaration(typeName));
    // GLOBAL.logDuration(`BEFORE DECL KINDDDDD ${typeName}`, 'magentaBright');
    if (isClassDeclaration(typeName)) {
        return TypeDeclarationKind.CLASS_DECLARATION;
    } else if (isEnumDeclaration(typeName)) {
        return TypeDeclarationKind.ENUM_DECLARATION;
    } else if (isInterfaceDeclaration(typeName)) {
        // GLOBAL.logDuration(`DECL KINDDDDD ${typeName}`, 'yellowBright');
        return TypeDeclarationKind.INTERFACE_DECLARATION;
    } else if (isTypeAliasDeclaration(typeName)) {
        return TypeDeclarationKind.TYPE_ALIAS_DECLARATION;
    } else {
        return undefined;
    }
}


export function isClassDeclaration(typeName: string): boolean {
    return GLOBAL.classNames.includes(typeName);
}


export function isEnumDeclaration(typeName: string): boolean {
    // GLOBAL.logDuration('IS ENUMMMM ?', 'cyanBright');
    return GLOBAL.enumNames.includes(typeName);
}


// export function isEnumDeclaration(typeName: string): boolean {
//     GLOBAL.logDuration('IS ENUMMMM ?', 'cyanBright');
//     return hasDeclarationType(typeName, getDescendantEnums);
// }


export function isInterfaceDeclaration(typeName: string): boolean {
    // GLOBAL.logDuration('IS INTERFACEEEE ?', 'blueBright');
    return GLOBAL.interfaceNames.includes(typeName);
}

// export function isInterfaceDeclaration(typeName: string): boolean {
//     GLOBAL.logDuration('IS INTERFACEEEE ?', 'blueBright');
//     return hasDeclarationType(typeName, getDescendantInterfaces);
// }


export function isTypeAliasDeclaration(typeName: string): boolean {
    // GLOBAL.logDuration('IS TYPEEEEEE ?', 'cyanBright');
    return GLOBAL.typeNames.includes(typeName);
}

// export function isTypeAliasDeclaration(typeName: string): boolean {
//     return hasDeclarationType(typeName, getDescendantTypeAliases);
// }


function hasDeclarationType(typeName: string, getTDeclaration: (sourceFile: SourceFile) => Declaration[]): boolean {
    return hasDeclarationInProject(typeName, getTDeclaration) || hasDeclarationOutOfProject(typeName, getTDeclaration) || hasDeclarationInTypeScript(typeName);
}


function hasDeclarationInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => Declaration[]): boolean {
    return !!GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()?.toLowerCase()).includes(typeName?.toLowerCase()));
}

// TODO
export function isDeclaredOutOfProject(target: string): boolean {
    // console.log(chalk.blueBright('IS DECLARED OOPPPPPPP ???'), target);
    return undefined;
}


// TODO: SEARCH Mapper.create and set declarationInfos including out of project
// TODO: Create a specific file for that ?
export function hasDeclarationOutOfProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => Declaration[]): boolean {
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


function getDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => Declaration[]): Declaration {
    if (hasDeclarationInTypeScript(typeName)) {
        return getTypeScriptDeclaration(typeName);
    }
    let sourceFile: SourceFile = getDeclarationSourceFileInProject(typeName, getTDeclaration);
    return getTDeclaration(sourceFile).find(t => t.getName() === typeName);
}


function getDeclarationSourceFileInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => Declaration[]): SourceFile {
    return GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function getTypeScriptDeclaration(typeName: string): Declaration {
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


export function isPropertyOld(propertyName: string, declaration: ClassOrInterfaceDeclaration): boolean {
    return getProperties(declaration).map(p => p[0]).includes(propertyName);
}


export function getProperties(declaration: ClassOrInterfaceDeclaration): Property[] {
    return declaration?.getStructure().properties.map(p => {
        return {name: p.name, type: p.type, initializer: p.initializer} as Property;
    });
}

