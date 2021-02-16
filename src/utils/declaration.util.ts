import { TypeDeclarationEnum } from '../enums/type-declaration.enum';
import { GLOBAL } from '../const/global.const';
import { SourceFile } from 'ts-morph';
import { TypeDeclaration } from '../types/type-declaration.type';
import * as chalk from 'chalk';
import { throwCustom } from './errors.util';


export function typeDeclaration(typeName: string): TypeDeclarationEnum {
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
    if (typeName === 'EmployerSpec') {
        console.log(chalk.magentaBright('SEARCH CLASSSES'));
    }
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getClasses());
}


export function isEnumDeclaration(typeName: string): boolean {
    if (typeName === 'EmployerSpec') {
        console.log(chalk.yellowBright('SEARCH ENUMMMMS'));
    }
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getEnums());
}


export function isTypeAliasDeclaration(typeName: string): boolean {
    if (typeName === 'EmployerSpec') {
        console.log(chalk.greenBright('SEARCH TYPEEEES'));
    }
    return hasDeclaration(typeName, (sourceFile: SourceFile) => sourceFile.getTypeAliases());
}


function hasDeclaration(typeName: string, getTypeDeclaration: (sourceFile: SourceFile) => TypeDeclaration[]): boolean {
    if (typeName === 'EmployerSpec') {
        console.log(chalk.blueBright('CLASSSS ?'), GLOBAL.project.getSourceFiles().find(s => s.getClasses().map(t => t.getName()).includes(typeName)));
        console.log(chalk.cyanBright('RETURNNNNNN'), GLOBAL.project.getSourceFiles().find(s => getTypeDeclaration(s).map(c => c.getName()).includes(typeName))?.getBaseName());
    }
    return !!GLOBAL.project.getSourceFiles().find(s => getTypeDeclaration(s).map(c => c.getName()).includes(typeName));
}
