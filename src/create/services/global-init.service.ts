import { GLOBAL } from '../const/global.const';
import { generateInstance } from '../../dist/instance-generator';
import { declarationInfos } from '../../dist/declaration-infos';
import { config } from '../../dist/config';
import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';
import * as chalk from 'chalk';


export class GlobalInitService {


    static async start(): Promise<void> {
        if (!GLOBAL.wasInitialized) {
            GLOBAL.generateInstance = generateInstance;
            GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
            GLOBAL.config = config;
            console.log(chalk.magentaBright('GLOBAAAAAAAL CFG'), GLOBAL.config);
            GLOBAL.wasInitialized = true;
        }
    }
}
