import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    ImportSpecifier,
    SourceFile,
    TypeAliasDeclaration
} from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';
import { TypeDeclaration } from '../types/type-declaration.type';


export function getImportTypeDeclaration(apparentType: string, typeName: string): TypeDeclaration {
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
    const typeAliasDeclaration: TypeAliasDeclaration = importSourceFile.getTypeAlias(typeName);
    if (typeAliasDeclaration) {
        return typeAliasDeclaration;
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


export function getImportSpecifier(importDeclaration: ImportDeclaration): ImportSpecifier {
    const importSpecifiers: ImportSpecifier[] = importDeclaration.getNamedImports();
    return importSpecifiers.length > 0 ? importSpecifiers[0] : undefined;
}


export function isOutOfProject(sourceFile: SourceFile): boolean {
    return !sourceFile || sourceFile.isInNodeModules() || sourceFile.isFromExternalLibrary();
}
