import { CONFIG } from '../const/config.const';

export class InitConfigService {


    static async start(): Promise<void> {
        try {
            console.log('BEFORE IMPORTTTTT');
            // @ts-ignore
            const geneseConfig = await import('../../../../../../../geneseconfig');
            console.log('AFTER IMPORTTTTT', geneseConfig);
            // const geneseConfig = await import('../../../../../geneseconfig');
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
        } catch (err) {
            const message = 'a file geneseconfig.ts must be at the root of your project.\nPlease refer to the documentation https://www.npmjs.com/package/genese/creator';
            throw Error(message);
        }
    }
}
