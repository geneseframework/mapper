import { MethodDeclaration, SourceFile } from 'ts-morph';
import * as chalk from 'chalk';

export class FlagService {

    static async init(): Promise<void> {
        console.log(chalk.blueBright('Init mapping...'));
        const mapperSourceFile: SourceFile = this.getMapperSourceFile();
        const initDeclaration: MethodDeclaration = mapperSourceFile.getClass('Mapper').getMethod('init');
        console.log(chalk.blueBright('Types mapped'));
    }


    private static getMapperSourceFile(): SourceFile {

    }

}
