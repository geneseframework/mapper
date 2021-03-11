import { InitConfigService } from './init-config.service';
import { GLOBAL } from '../const/global.const';

const appRoot = require('app-root-path');

export class GlobalInitService {


    static async start(): Promise<void> {
        if (!GLOBAL.wasInitialized) {
            GLOBAL.projectPath = appRoot;
            GLOBAL.nodeModulePath = GLOBAL.debug ? process.cwd() : `${GLOBAL.projectPath}/node_modules/@genese/mapper`;
            GLOBAL.generateInstance = await require(GLOBAL.instanceGeneratorPath).generateInstance;
            GLOBAL.declarationInfos = await require(GLOBAL.declarationInfosPath).DECLARATION_INFOS;
            await InitConfigService.start();
            GLOBAL.wasInitialized = true;
        }
    }
}
