import { ClassDeclaration, EnumDeclaration, SourceFile } from 'ts-morph';
import { ClassOrEnumDeclaration } from '../types/class-or-enum-declaration.type';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';
import { KeyValue } from '../models/key-value.model';

export function isOutOfProject(sourceFile: SourceFile): boolean {
    return !sourceFile || sourceFile.isInNodeModules() || sourceFile.isFromExternalLibrary();
}


export function getImportDeclaration(apparentType: string, typeName: string): ClassOrEnumDeclaration {
    const apparentTypeImportDeclarationPath: string = getApparentTypeImportDeclarationPath(apparentType);
    const importSourceFile: SourceFile = getImportSourceFile(apparentTypeImportDeclarationPath);
    const importClassDeclaration: ClassDeclaration = importSourceFile.getClasses().find(c => c.getName() === typeName);
    if (importClassDeclaration) {
        return importClassDeclaration;
    }
    const importEnumDeclaration: EnumDeclaration = importSourceFile.getEnums().find(c => c.getName() === typeName);
    if (importEnumDeclaration) {
        if (typeName === 'Mood') {
            console.log(chalk.redBright('GET IMPRT DECLLLLLL'), apparentTypeImportDeclarationPath);
            console.log(chalk.redBright('GET IMPRT DECLLLLLL STRUCT'), importEnumDeclaration.getText());
            console.log(chalk.redBright('GET IMPRT DECLLLLLL STRUCT'), importEnumDeclaration.getStructure());
        }
        return importEnumDeclaration;
    }
    return undefined;
}


/**
 * Returns the path of the import of a property with its apparent type
 * @param apparentType
 * @private
 */
function getApparentTypeImportDeclarationPath(apparentType: string): string {
    const pathWithoutExtension: string = /^import\("(.*)"/.exec(apparentType)?.[1];
    return `${pathWithoutExtension}.ts`;
}


function getImportSourceFile(path: string): SourceFile {
    let importSourceFile: SourceFile = GLOBAL.project.getSourceFile(path);
    if (isOutOfProject(importSourceFile)) {
        console.log(chalk.redBright('Is out of project'), path);
        importSourceFile = GLOBAL.project.addSourceFileAtPath(path);
    }
    console.log(chalk.blueBright('IMPORT NAMEEEEE'), importSourceFile.getBaseName());
    return importSourceFile;
}



export function isEnumValue(declaration: EnumDeclaration, value: any): boolean {
    return this.enumValues(declaration).includes(value);
}


export function enumValues(declaration: EnumDeclaration): any[] {
    return declaration.getStructure().members?.map(m => (m.initializer as string).slice(1, -1));
}

