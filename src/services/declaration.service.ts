import { ClassDeclaration, EnumDeclaration, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { flat } from '../utils/arrays.util';
import * as chalk from 'chalk';
import { throwCustom } from '../utils/errors.util';
import { getClasses } from '../utils/ast-class.util';
import { getTypeAliases } from '../utils/ast-types.util';

export class DeclarationService {

    //
    // static getDeclaration(name: string, declarationKind: 'ClassDeclaration'): ClassDeclaration
    // static getDeclaration(name: string, declarationKind: 'EnumDeclaration'): EnumDeclaration
    // static getDeclaration(name: string, declarationKind: 'TypeAliasDeclaration'): TypeAliasDeclaration
    // static getDeclaration(name: string, declarationKind: ClassOrTypeAliasType): ClassOrTypeAliasDeclaration {
    //     if (declarationKind === 'ClassDeclaration') {
    //         return this.getClassOrTypeAliasDeclaration(name, getClasses);
    //     } else  {
    //         return this.getClassOrTypeAliasDeclaration(name, getTypeAliases);
    //     }
    // }
    //
    //
    // static getClassOrTypeAliasDeclaration(name: string, getElements: (sourceFile: SourceFile) => ClassOrTypeAliasDeclaration[]): ClassOrTypeAliasDeclaration {
    //     const classDeclarations: ClassOrTypeAliasDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => getElements(s).filter(c => c.getName() === name)));
    //     if (classDeclarations.length === 0) {
    //         throwCustom(`ERROR : no declaration called "${name}" in your project`);
    //     } else if (classDeclarations.length > 1) {
    //         console.log(chalk.yellowBright(`WARNING : multiple declarations called "${name}" in your project. Please use the MapperOption "declarationPath" to fix it.`));
    //     }
    //     return classDeclarations[0];
    // }

}
