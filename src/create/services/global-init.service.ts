import { InitConfigService } from './init-config.service';
import { GLOBAL } from '../const/global.const';
import { generateInstance } from '../../dist/instance-generator';
import { declarationInfos } from '../../dist/declaration-infos';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';
// import * as chalk from 'chalk';
// import { INIT } from '../../init/const/init.const';


export class GlobalInitService {


    static async start(): Promise<void> {
        if (!GLOBAL.wasInitialized) {
            GLOBAL.generateInstance = generateInstance;
            // console.log(chalk.greenBright('INIT GLOBALLLLL'), GLOBAL.declarationInfos?.length);
            // delete require.cache[require.resolve(INIT.declarationInfoPath)];
            GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
            // console.log(chalk.greenBright('INIT GLOBALLLLL 2222'), GLOBAL.declarationInfos?.length);
            await InitConfigService.start();
            GLOBAL.wasInitialized = true;
        }
    }
}
