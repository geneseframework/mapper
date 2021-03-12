import { InitConfigService } from './init-config.service';
import { GLOBAL } from '../const/global.const';
import { generateInstance } from '../../dist/instance-generator';
import { declarationInfos } from '../../dist/declaration-infos';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';

const appRoot = require('app-root-path');

export class GlobalInitService {


    static async start(): Promise<void> {
        if (!GLOBAL.wasInitialized) {
            GLOBAL.projectPath = appRoot;
            GLOBAL.nodeModulePath = GLOBAL.debug ? process.cwd() : `${GLOBAL.projectPath}/node_modules/@genese/creator`;
            GLOBAL.generateInstance = generateInstance;
            GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
            await InitConfigService.start();
            GLOBAL.wasInitialized = true;
        }
    }
}
