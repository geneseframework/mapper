import { MethodDeclaration, Project, SourceFile } from 'ts-morph';
import * as chalk from 'chalk';
import { GLOBAL } from '../const/global.const';

export class FlagService {

    static async init(): Promise<void> {
        console.log(chalk.yellowBright('Init mapping...'));
        const initDeclaration: MethodDeclaration = GLOBAL.nodeModuleMapper.getClass('Mapper').getMethod('create');
        console.log(chalk.blueBright('CREATE DECLARRRRR'), initDeclaration);
        console.log(chalk.yellowBright('Types mapped'));
    }

}
