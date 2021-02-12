import { ClassDeclaration, EnumDeclaration, ImportDeclaration, ImportSpecifier, SourceFile } from 'ts-morph';
import { ClassOrEnumDeclaration } from '../types/class-or-enum-declaration.type';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';

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
        return importEnumDeclaration;
    }
    return undefined;
}


/**
 * Returns the path of the import of a property with its apparent type
 * @param apparentType
 * @private
 */
export function getApparentTypeImportDeclarationPath(apparentType: string): string {
    const pathWithoutExtension: string = /^import\("(.*)"/.exec(apparentType)?.[1];
    return `${pathWithoutExtension}.ts`;
}


function getImportSourceFile(path: string): SourceFile {
    let importSourceFile: SourceFile = GLOBAL.project.getSourceFile(path);
    if (isOutOfProject(importSourceFile)) {
        console.log(chalk.redBright('Is out of project'), path);
        importSourceFile = GLOBAL.project.addSourceFileAtPath(path);
    }
    return importSourceFile;
}


export function isEnumValue(declaration: EnumDeclaration, value: any): boolean {
    return this.enumValues(declaration).includes(value);
}


export function enumValues(declaration: EnumDeclaration): any[] {
    return declaration.getStructure().members?.map(m => (m.initializer as string).slice(1, -1));
}


export function getImportSpecifier(importDeclaration: ImportDeclaration): ImportSpecifier {
    const importSpecifiers: ImportSpecifier[] = importDeclaration.getNamedImports();
    return importSpecifiers.length > 0 ? importSpecifiers[0] : undefined;
}


// TODO : Heritage ?
export function getNumberOfConstructorArguments(classDeclaration: ClassDeclaration): number {
    const constructorDeclarations = classDeclaration.getConstructors();
    if (!constructorDeclarations || constructorDeclarations.length === 0) {
        return 0;
    } else {
        return constructorDeclarations[0].getParameters()?.length;
    }
}
