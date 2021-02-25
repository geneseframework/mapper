import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { TypeDeclaration } from '../types/type-declaration.type';
import { getTypeDeclaration } from './ast-declaration.util';
import { throwWarning } from './errors.util';
import { isPrimitiveTypeName } from './primitives.util';

// TODO: Fix case of properties with type which is Union Type
export function getImportTypeDeclaration(apparentType: string, typeName: string): TypeDeclaration {
    if (isPrimitiveTypeName(typeName)) {
        return undefined;
    }
    const apparentTypeImportDeclarationPath: string = getApparentTypeImportDeclarationPath(apparentType);
    const importSourceFile: SourceFile = getImportSourceFile(apparentTypeImportDeclarationPath);
    if (!importSourceFile) {
        throwWarning(`Import declaration not found for type "${typeName}" and apparent type "${apparentType}"`);
        return undefined;
    }
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
    return getNotExportedDeclarations(typeName);
}


function getNotExportedDeclarations(typeName: string): TypeDeclaration {
    return getTypeDeclaration(typeName);
}


/**
 * Returns the path of the import of a property with its apparent type
 * @param apparentType
 * @private
 */
export function getApparentTypeImportDeclarationPath(apparentType: string): string {
    if (isTsFilePath(apparentType)) {
        return apparentType;
    } else {
        const pathWithoutExtension: string = /^import\("(.*)"/.exec(apparentType)?.[1];
        return `${pathWithoutExtension}.ts`;
    }
}


function isTsFilePath(path: string): boolean {
    return /^\/([A-z0-9-_+]+\/)*([A-z0-9]+\.(ts|d.ts))$/gm.test(path);
}


function getImportSourceFile(path: string): SourceFile {
    return GLOBAL.project.getSourceFile(path) ?? GLOBAL.project.getSourceFile(declarationFile(path));
}


function declarationFile(tsPath: string): string {
    if (tsPath.slice(-3) === '.ts' && tsPath.slice(-5) !== '.d.ts') {
        return `${tsPath.slice(0, -3)}.d.ts`;
    } else {
        return undefined;
    }
}
