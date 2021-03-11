import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    SourceFile,
    SyntaxKind,
    TypeAliasDeclaration
} from 'ts-morph';
import { DeclarationOrDate, GenericableDeclaration } from '../../types/type-declaration.type';
import { throwWarning } from '../errors.util';
import { flat } from '../native/arrays.util';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { DateDeclaration } from '../../models/date-declaration.model';
import { Property } from '../../types/target/property.type';
import { ClassOrInterfaceInfo } from '../../types/class-or-interface-info.type';
import { TypeDeclarationKind } from '../../types/type-declaration-kind.type';
import { GenericParameter } from '../../types/target/generic-parameter.type';
import { INIT } from '../../init/init.const';


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


export function getTypeDeclaration(typeName: string, typeDeclarationKind: TypeDeclarationKind): DeclarationOrDate {
    // const typeDeclarationKind: TypeDeclarationKind = declarationKind(typeName);
    switch (typeDeclarationKind) {
        case 'Class':
            return getDeclaration(typeName, getDescendantClasses);
        case 'Enum':
            return getDeclaration(typeName, getDescendantEnums);
        case 'Interface':
            return getDeclaration(typeName, getDescendantInterfaces);
        case 'TypeAlias':
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


function hasDeclarationInTypeScript(typeName: string): boolean {
    if (typeName === 'Date') {
        return true;
    }
    return undefined;
}


export function getImportDeclarations(typeName: string): ImportDeclaration[] {
    const declarations: ImportDeclaration[] = flat(INIT.projectWithNodeModules.getSourceFiles().map(s => s.getImportDeclarations()));
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
    return INIT.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function getTypeScriptDeclaration(typeName: string): DeclarationOrDate {
    if (typeName === 'Date') {
        return new DateDeclaration();
    }
    return undefined;
}


export function isProperty(propertyName: string, declaration: ClassOrInterfaceInfo): boolean {
    return !!declaration.properties.find(p => p.name === propertyName);
}


export function getProperties(declaration: ClassOrInterfaceDeclaration): Property[] {
    // @ts-ignore
    return declaration?.getStructure().properties.map(p => {
        return {name: p.name, type: p.type, initializer: p.initializer, isRequired: !p.hasQuestionToken} as Property;
    });
}


export function genericParameters(declaration: GenericableDeclaration): GenericParameter[] {
    return declaration.getStructure().typeParameters;
}

