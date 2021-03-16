import { GLOBAL } from '../const/global.const';
import { generateInstance } from '../../dist/instance-generator';
import { declarationInfos } from '../../dist/declaration-infos';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';
import { geneseConfig } from '../../../geneseconfig';
import { defaultGeneseConfig } from '../const/geneseconfig';


export class GlobalInitService {


    static async start(): Promise<void> {
        if (!GLOBAL.wasInitialized) {
            GLOBAL.generateInstance = generateInstance;
            GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
            GLOBAL.geneseConfig = this.setGeneseConfig();
            console.log('GLOBAL.geneseConfiggggg', GLOBAL.geneseConfig);
            GLOBAL.wasInitialized = true;
        }
    }


    private static setGeneseConfig(): any {
        const defaultConfig = defaultGeneseConfig;
        if (!geneseConfig?.creator) {
            return;
        }
        if (geneseConfig.creator.differentiateStringsAndNumbers === false) {
            defaultConfig.creator.differentiateStringsAndNumbers = false;
        }
        if (geneseConfig.creator.throwTarget?.error === true) {
            defaultConfig.creator.throwTarget.error = true;
        }
        if (geneseConfig.creator.throwTarget?.setToUndefined === true) {
            defaultConfig.creator.throwTarget.setToUndefined = true;
        }
        return defaultConfig;
    }
}
