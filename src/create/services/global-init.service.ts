import { GLOBAL } from '../const/global.const';
import { generateInstance } from '../../dist/instance-generator';
import { declarationInfos } from '../../dist/declaration-infos';
import { config } from '../../dist/config';
import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';


export class GlobalInitService {


    static start(): void {
        if (!GLOBAL.wasInitialized) {
            GLOBAL.generateInstance = generateInstance;
            GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
            GLOBAL.config = config;
            GLOBAL.wasInitialized = true;
        }
    }
}
