import { ClassDeclaration, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { flat } from '../utils/arrays.util';
import * as chalk from 'chalk';
import { throwCustom } from '../utils/errors.util';
import { ensureDirAndCopy, getClonedFilePath } from '../utils/file-system.util';

export class AstService {

    static async createConstructorFile(className: string): Promise<any> {
        const classDeclaration: ClassDeclaration = this.getClassDeclaration(className);
        console.log(chalk.blueBright('CLASS DECCLLLL'), classDeclaration?.getName());
        await this.cloneFile(classDeclaration.getSourceFile());
        const flaggedSourceFile: SourceFile = this.flag(classDeclaration.getSourceFile());
        // await flaggedSourceFile.saveSync();
    }


    static getClassDeclaration(className: string): ClassDeclaration {
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses().filter(c => c.getName() === className)));
        if (classDeclarations.length === 0) {
            throwCustom(`ERROR : no class called ${className} in your project`);
        } else if (classDeclarations.length > 1) {
            console.log(chalk.yellowBright(`WARNING : multiple classes called ${className} in your project. Please use the option "classFilePath" to fix it.`));
        }
        return classDeclarations[0];
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
