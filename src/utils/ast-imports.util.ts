import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';
import { TypeDeclaration } from '../types/type-declaration.type';


export function getImportTypeDeclaration(apparentType: string, typeName: string): TypeDeclaration {
    const apparentTypeImportDeclarationPath: string = getApparentTypeImportDeclarationPath(apparentType);
    // console.log(chalk.redBright('PATHHHHHH apparentTypeImportDeclarationPath'), apparentTypeImportDeclarationPath);
    const importSourceFile: SourceFile = getImportSourceFile(apparentTypeImportDeclarationPath);
    const importClassDeclaration: ClassDeclaration = importSourceFile.getClasses().find(c => c.getName() === typeName);
    if (importClassDeclaration) {
        return importClassDeclaration;
    }
    const importEnumDeclaration: EnumDeclaration = importSourceFile.getEnums().find(c => c.getName() === typeName);
    if (importEnumDeclaration) {
        return importEnumDeclaration;
    }
    const typeAliasDeclaration: TypeAliasDeclaration = importSourceFile.getTypeAlias(typeName);
    if (typeAliasDeclaration) {
        return typeAliasDeclaration;
    }
    const interfaceDeclaration: InterfaceDeclaration = importSourceFile.getInterface(typeName);
    if (interfaceDeclaration) {
        return interfaceDeclaration;
    }
    return undefined;
}


/**
 * Returns the path of the import of a property with its apparent type
 * @param apparentType
 * @private
 */
export function getApparentTypeImportDeclarationPath(apparentType: string): string {
    // console.log(chalk.cyanBright('PATHHHHHH'), apparentType);
    // console.log(chalk.cyanBright('PATHHHHHH IS TS FILE ????'), isTsFilePath(apparentType));
    if (isTsFilePath(apparentType)) {
        return apparentType;
    } else {
        const pathWithoutExtension: string = /^import\("(.*)"/.exec(apparentType)?.[1];
        // console.log(chalk.cyanBright('PATHHHHHH pathWithoutExtension'), pathWithoutExtension);
        return `${pathWithoutExtension}.ts`;
    }
}


function isTsFilePath(path: string): boolean {
    return /^\/([A-z0-9-_+]+\/)*([A-z0-9]+\.(ts|d.ts))$/gm.test(path);
}


function getImportSourceFile(path: string): SourceFile {
    // console.log(chalk.greenBright('get   IMPORTTTTT'), path);
    // console.log(chalk.greenBright('get   IMPORTTTTT declarationFile(path)'), declarationFile(path));
    let importSourceFile: SourceFile = GLOBAL.project.getSourceFile(path) ?? GLOBAL.project.getSourceFile(declarationFile(path));
    // console.log(chalk.greenBright('get   IMPORTTTTT importSourceFile'), importSourceFile?.getFilePath());
    // if (isOutOfProject(importSourceFile)) {
    //     console.log(chalk.redBright('Is out of project'), path);
    //     importSourceFile = GLOBAL.project.addSourceFileAtPath(path);
    //     console.log(chalk.greenBright('IMPORTTTTT'), importSourceFile?.getBaseName());
    // }
    return importSourceFile;
}


function declarationFile(tsPath: string): string {
    if (tsPath.slice(-3) === '.ts' && tsPath.slice(-5) !== '.d.ts') {
        return `${tsPath.slice(0, -3)}.d.ts`;
    } else {
        return undefined;
    }
}


export function isOutOfProject(sourceFile: SourceFile): boolean {
    return !sourceFile || sourceFile.isInNodeModules() || sourceFile.isFromExternalLibrary();
}
