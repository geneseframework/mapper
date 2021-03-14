import { CONFIG } from '../const/config.const';
import { geneseConfig } from '../../debug/project/geneseconfig';

export class InitConfigService {


    static async start(): Promise<void> {
        if (!geneseConfig?.creator) {
            return;
        }
        if (geneseConfig.creator.differentiateStringsAndNumbers === false) {
            CONFIG.create.differentiateStringsAndNumbers = false;
        }
        if (geneseConfig.creator.throwTarget?.error === true) {
            CONFIG.create.throwTarget.error = true;
        }
        if (geneseConfig.creator.throwTarget?.setToUndefined === true) {
            CONFIG.create.throwTarget.setToUndefined = true;
        }
    }
}
