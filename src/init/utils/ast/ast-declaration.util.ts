import {
    ClassDeclaration,
    EnumDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    TypeAliasDeclaration
} from 'ts-morph';
import { INIT } from '../../const/init.const';
import { DeclarationOrDate, GenericableDeclaration } from '../../types/type-declaration.type';
import { GenericParameter } from '../../../shared/types/target/generic-parameter.type';
import { TypeDeclarationKind } from '../../../shared/types/type-declaration-kind.type';
import { flat } from '../../../shared/utils/arrays.util';
import { HasStructureType } from '../../types/has-structure-type.type';

/**
 * Returns the string corresponding to the type of a given Declaration or Date
 * @param declarationOrDate     // The Declaration or Date to check
 */
export function getDeclarationKind(declarationOrDate: DeclarationOrDate): TypeDeclarationKind {
    if (!declarationOrDate) {
        return undefined;
    } else if (declarationOrDate instanceof ClassDeclaration) {
        return 'Class';
    } else if (declarationOrDate instanceof EnumDeclaration) {
        return 'Enum';
    } else if (declarationOrDate instanceof InterfaceDeclaration) {
        return 'Interface';
    } else if (declarationOrDate instanceof TypeAliasDeclaration) {
        return 'TypeAlias';
    }
}

/**
 * Returns the array of ImportDeclaration corresponding to a given name
 * @param name      // The name to search in the ImportDeclarations of the user's project
 */
export function getImportDeclarations(name: string): ImportDeclaration[] {
    const declarations: ImportDeclaration[] = flat(INIT.project.getSourceFiles().map(s => s.getImportDeclarations()));
    const declarationsWithSameName: ImportDeclaration[] = declarations.filter(i => i.getNamedImports().find(n => n.getName() === name));
    return groupByImportPath(declarationsWithSameName);
}

/**
 * Returns the array of unique ImportDeclaration of a given array of ImportDeclaration
 * @param declarations
 */
function groupByImportPath(declarations: ImportDeclaration[]): ImportDeclaration[] {
    const importDeclarations: ImportDeclaration[] = [];
    for (const declaration of declarations) {
        if (!importDeclarations.map(d => d.getModuleSpecifierSourceFile()?.getFilePath()).includes(declaration.getModuleSpecifierSourceFile().getFilePath())) {
            importDeclarations.push(declaration);
        }
    }
    return importDeclarations;
}

/**
 * Returns the stringified type corresponding to a Node having a Declaration with a defined getStructure().type
 * @param declaration
 */
export function declarationType(declaration: HasStructureType): string {
    const type: string = declaration.getStructure().type as string;
    return removeIncorrectChars(type);
}

/**
 * Removes chars of a given text which can't be used in stringified types, as \n or \r
 * @param text      // The text to analyze
 */
function removeIncorrectChars(text: string): string {
    if (!text) {
        return text;
    }
    text = text.replace(/\r?\n|\r/g, '')
        .replace(/ +/g, ' ');
    return text;
}

/**
 * Returns the generic parameters of a given declaration
 * @param declaration   // The declaration to analyze
 */
export function genericParameters(declaration: GenericableDeclaration): GenericParameter[] {
    return declaration.getStructure().typeParameters;
}

