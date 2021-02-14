import { ClassDeclaration, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { flat } from '../utils/arrays.util';
import * as chalk from 'chalk';
import { throwCustom } from '../utils/errors.util';
import { ensureDirAndCopy, getClonedFilePath } from '../utils/file-system.util';
import { ClassOrTypeAliasDeclaration, ClassOrTypeAliasType } from '../types/class-or-type-alias-declaration.enum';

export class AstService {



    static getDeclaration(name: string, declarationKind: 'ClassDeclaration'): ClassDeclaration
    static getDeclaration(name: string, declarationKind: 'TypeAliasDeclaration'): TypeAliasDeclaration
    static getDeclaration(name: string, declarationKind: ClassOrTypeAliasType): ClassOrTypeAliasDeclaration {
        if (declarationKind === 'ClassDeclaration') {
            return this.getClassDeclaration(name);
        }
        return undefined;
    }


    static getClassDeclaration(className: string): ClassDeclaration {
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses().filter(c => c.getName() === className)));
        if (classDeclarations.length === 0) {
            throwCustom(`ERROR : no class called "${className}" in your project`);
        } else if (classDeclarations.length > 1) {
            console.log(chalk.yellowBright(`WARNING : multiple classes called "${className}" in your project. Please use the option "classFilePath" to fix it.`));
        }
        return classDeclarations[0];
    }


    static getTypeAliasDeclaration(typeName: string): TypeAliasDeclaration {
        const typeDeclarations: TypeAliasDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getTypeAliases().filter(c => c.getName() === typeName)));
        if (typeDeclarations.length === 0) {
            throwCustom(`ERROR : no type called "${typeName}" in your project`);
        } else if (typeDeclarations.length > 1) {
            console.log(chalk.yellowBright(`WARNING : multiple types called "${typeName}" in your project. Please use the option "typeFilePath" to fix it.`));
        }
        return typeDeclarations[0];
    }


    private static async cloneFile(sourceFile: SourceFile): Promise<void> {
        console.log(chalk.blueBright('ORIGGGGGG PATHHHHH'), sourceFile.getFilePath());
        console.log(chalk.blueBright('FLAG PATHHHHH'), getClonedFilePath(sourceFile.getFilePath()));
        await ensureDirAndCopy(sourceFile.getFilePath(), getClonedFilePath(sourceFile.getFilePath()));
    }


    private static flag(sourceFile: SourceFile): SourceFile {
        return undefined;
    }

}
