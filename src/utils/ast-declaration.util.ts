import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { GLOBAL } from '../const/global.const';
import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    SourceFile,
    SyntaxKind,
    TypeAliasDeclaration
} from 'ts-morph';
import { TypeDeclaration } from '../types/type-declaration.type';
import { throwCustom } from './errors.util';
import { flat } from './arrays.util';


export function declarationKind(typeName: string): TypeDeclarationKind {
    if (isClassDeclaration(typeName)) {
        return TypeDeclarationKind.CLASS_DECLARATION;
    } else if (isEnumDeclaration(typeName)) {
        return TypeDeclarationKind.ENUM_DECLARATION;
    } else if (isInterfaceDeclaration(typeName)) {
        return TypeDeclarationKind.INTERFACE_DECLARATION;
    } else if (isTypeAliasDeclaration(typeName)) {
        return TypeDeclarationKind.TYPE_ALIAS_DECLARATION;
    } else {
        throwCustom(`Error: declaration not found for ${typeName}`);
        return undefined;
    }
}


function isClassDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.ClassDeclaration));
}


function isEnumDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.EnumDeclaration));
}


function isInterfaceDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration));
}


function isTypeAliasDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration));
}


function hasDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    return hasDeclarationInProject(typeName, getTDeclaration) || hasDeclarationOutOfProject(typeName, getTDeclaration);
}


function hasDeclarationInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    return !!GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function hasDeclarationOutOfProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    const declarations: ImportDeclaration[] = getImportDeclarations(typeName);
    if (declarations.length === 0) {
        return false;
    } else if (declarations.length > 1) {
        // TODO : implement
        throwCustom(`Error: ${typeName} is declared in multiple files.`)
    } else {
        const importSourceFile: SourceFile = declarations[0].getModuleSpecifierSourceFile();
        if (getTDeclaration(importSourceFile)?.length > 0) {
            GLOBAL.project.addSourceFileAtPath(importSourceFile.getFilePath());
            return true;
        } else {
            return false;
        }
    }
    return !!GLOBAL.projectWithNodeModules.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


function getImportDeclarations(typeName: string): ImportDeclaration[] {
    const declarations: ImportDeclaration[] = flat(GLOBAL.projectWithNodeModules.getSourceFiles().map(s => s.getImportDeclarations()));
    return declarations.filter(i => i.getNamedImports().find(n => n.getName() === typeName));
}


export function getTypeDeclaration(typeName: string): TypeDeclaration {
    const declarationEnum: TypeDeclarationKind = declarationKind(typeName);
    switch (declarationEnum) {
        case TypeDeclarationKind.CLASS_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.ClassDeclaration));
        case TypeDeclarationKind.ENUM_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.EnumDeclaration));
        case TypeDeclarationKind.INTERFACE_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration));
        case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration));
        default:
            throwCustom('Impossible to find TypeAliasDeclaration corresponding to ', typeName);
    }
}


function getDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): TypeDeclaration {
    let sourceFile: SourceFile = getDeclarationSourceFileInProject(typeName, getTDeclaration);
    return getTDeclaration(sourceFile).find(t => t.getName() === typeName);
}


function getDeclarationSourceFileInProject(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): SourceFile {
    return GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


export function getDeclarationKind(typeDeclaration: TypeDeclaration): TypeDeclarationKind {
    if (!typeDeclaration) {
        return undefined;
    }
    if (typeDeclaration instanceof ClassDeclaration) {
        return TypeDeclarationKind.CLASS_DECLARATION;
    }
    if (typeDeclaration instanceof EnumDeclaration) {
        return TypeDeclarationKind.ENUM_DECLARATION;
    }
    if (typeDeclaration instanceof InterfaceDeclaration) {
        return TypeDeclarationKind.INTERFACE_DECLARATION;
    }
    if (typeDeclaration instanceof TypeAliasDeclaration) {
        return TypeDeclarationKind.TYPE_ALIAS_DECLARATION;
    }

}
