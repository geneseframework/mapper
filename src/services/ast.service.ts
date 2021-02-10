import { ClassDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { flat } from '../utils/arrays.util';
import * as chalk from 'chalk';
import { throwCustom } from '../utils/errors.util';

export class AstService {

    static async createConstructorFile(className: string): Promise<any> {
        const classDeclaration: ClassDeclaration = this.getClassDeclaration(className);
        console.log(chalk.blueBright('CLASS DECCLLLL'), classDeclaration?.getName());
    }


    private static getClassDeclaration(className: string): ClassDeclaration {
        const classDeclarations: ClassDeclaration[] = flat(GLOBAL.project.getSourceFiles().map(s => s.getClasses().filter(c => c.getName() === className)));
        if (classDeclarations.length === 0) {
            throwCustom(`ERROR : no class called ${className} in your project`);
        } else if (classDeclarations.length > 1) {
            console.log(chalk.yellowBright(`WARNING : multiple classes called ${className} in your project. Please use the option "classFilePath" to fix it.`));
        } else {
            return classDeclarations[0];
        }
    }

}
