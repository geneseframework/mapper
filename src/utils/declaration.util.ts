import { TypeDeclarationEnum } from '../enums/type-declaration.enum';
import { GLOBAL } from '../const/global.const';
import { SourceFile } from 'ts-morph';
import { TypeDeclaration } from '../types/type-declaration.type';
import * as chalk from 'chalk';
import { throwCustom } from './errors.util';


export function declarationKind(typeName: string): TypeDeclarationEnum {
    if (isClassDeclaration(typeName)) {
        return TypeDeclarationEnum.CLASS_DECLARATION;
    } else if (isEnumDeclaration(typeName)) {
        return TypeDeclarationEnum.ENUM_DECLARATION;
    } else if (isTypeAliasDeclaration(typeName)) {
        return TypeDeclarationEnum.TYPE_DECLARATION;
    } else {
        throwCustom(`Error: declaration not found for ${typeName}`);
        return undefined;
    }
}


export function isClassDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getClasses());
}


export function isEnumDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getEnums());
}


export function isTypeAliasDeclaration(typeName: string): boolean {
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getTypeAliases());
}


function hasDeclaration(typeName: string, getTypeDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    return !!GLOBAL.project.getSourceFiles().find(s => getTypeDeclaration(s).map(c => c.getName()).includes(typeName));
}


export function getTypeDeclaration(typeName: string): TypeDeclaration {
    const declarationEnum: TypeDeclarationEnum = declarationKind(typeName);
    switch (declarationEnum) {
        case TypeDeclarationEnum.CLASS_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getClasses());
        case TypeDeclarationEnum.ENUM_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getEnums());
        case TypeDeclarationEnum.TYPE_DECLARATION:
            return getDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getTypeAliases());
        default:
            throwCustom('Impossible to find TypeDeclaration corresponding to ', typeName);
    }
}


function getDeclaration(typeName: string, getTypeDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): TypeDeclaration {
    const sourceFile: SourceFile = GLOBAL.project.getSourceFiles().find(s => getTypeDeclaration(s).map(c => c.getName()).includes(typeName));
    return getTypeDeclaration(sourceFile).find(t => t.getName() === typeName);
}
