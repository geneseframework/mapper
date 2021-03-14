import { InitGlobalConfigService } from './init-global-config.service';
import { GLOBAL } from '../const/global.const';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';
import { generateInstance } from '../../../generated/instance-generator';
import { declarationInfos } from '../../../generated/declaration-infos';


export class GlobalInitService {


    static async start(): Promise<void> {
        if (!GLOBAL.wasInitialized) {
            GLOBAL.generateInstance = generateInstance;
            // console.log(chalk.greenBright('INIT GLOBALLLLL'), GLOBAL.declarationInfos?.length);
            // delete require.cache[require.resolve(INIT.declarationInfoPath)];
            GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
            // console.log(chalk.greenBright('INIT GLOBALLLLL 2222'), GLOBAL.declarationInfos?.length);
            await InitGlobalConfigService.start();
            GLOBAL.wasInitialized = true;
        }
    }
}
