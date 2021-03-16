import { GLOBAL } from '../const/global.const';
import { generateInstance } from '../../dist/instance-generator';
import { declarationInfos } from '../../dist/declaration-infos';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';
import { geneseConfig } from '../../../geneseconfig';
import { defaultGeneseConfig } from '../const/default-geneseconfig.const';


export class GlobalInitService {


    static async start(): Promise<void> {
        if (!GLOBAL.wasInitialized) {
            GLOBAL.generateInstance = generateInstance;
            GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
            console.log('GLOBAL.geneseConfiggggg', GLOBAL.geneseConfig);
            GLOBAL.wasInitialized = true;
        }
    }
}
