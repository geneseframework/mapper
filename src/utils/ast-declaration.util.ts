import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { GLOBAL } from '../const/global.const';
import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { TypeDeclaration } from '../types/type-declaration.type';
import { throwCustom } from './errors.util';


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
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getClasses());
}


function isEnumDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getEnums());
}


function isInterfaceDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getInterfaces());
}


function isTypeAliasDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getTypeAliases());
}


function hasDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    return !!GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
}


export function getTypeDeclaration(typeName: string): TypeDeclaration {
    const declarationEnum: TypeDeclarationKind = declarationKind(typeName);
    switch (declarationEnum) {
        case TypeDeclarationKind.CLASS_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getClasses());
        case TypeDeclarationKind.ENUM_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getEnums());
        case TypeDeclarationKind.INTERFACE_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getInterfaces());
        case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getTypeAliases());
        default:
            throwCustom('Impossible to find TypeAliasDeclaration corresponding to ', typeName);
    }
}


function getDeclaration(typeName: string, getTDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): TypeDeclaration {
    const sourceFile: SourceFile = GLOBAL.project.getSourceFiles().find(s => getTDeclaration(s).map(c => c.getName()).includes(typeName));
    return getTDeclaration(sourceFile).find(t => t.getName() === typeName);
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
