import { CONFIG } from '../const/config.const';
import { GLOBAL } from '../const/global.const';

export class InitGlobalConfigService {


    static async start(): Promise<void> {
        try {
            console.log('GENESE CONFIGGGG', GLOBAL.geneseConfig);
            // const path = GLOBAL.debug ? `${process.cwd()}/geneseconfig.ts` : '../../../../../../../geneseconfig.ts';
            // console.log('BEFORE GLOBAL IMPORTTTTT', await import(path));
            // @ts-ignore
            // geneseConfig
            // const geneseConfig = GLOBAL.debug ? ;
            // const geneseConfig = await import(path);
            // const geneseConfig = await import('../../../../../../../geneseconfig');
            // console.log('AFTER GLOBAL IMPORTTTTT', geneseConfig);
            // throw Error('zzz')

            if (!GLOBAL.geneseConfig?.creator) {
                return;
            }
            if (GLOBAL.geneseConfig.creator.differentiateStringsAndNumbers === false) {
                CONFIG.create.differentiateStringsAndNumbers = false;
            }
            if (GLOBAL.geneseConfig.creator.throwTarget?.error === true) {
                CONFIG.create.throwTarget.error = true;
            }
            if (GLOBAL.geneseConfig.creator.throwTarget?.setToUndefined === true) {
                CONFIG.create.throwTarget.setToUndefined = true;
            }
            console.log('GLOBAL.geneseConfiggggg', GLOBAL.geneseConfig);
        } catch (err) {
            const message = 'a file geneseconfig.ts must be at the root of your project.\nPlease refer to the documentation https://www.npmjs.com/package/genese/creator';
            throw Error(message);
        }
    }
}
