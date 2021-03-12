import { CONFIG } from '../const/config.const';
import { Config } from '../models/config.model';
import { GLOBAL } from '../const/global.const';

export class InitConfigService {


    static async start(): Promise<void> {
        const jsonConfig: Config = await this.getJsonConfig();
        this.setConfig(jsonConfig);
    }


    // TODO: fix usage of fs-extra
    private static async getJsonConfig(): Promise<object> {
        const path: string = `${GLOBAL.projectPath}/geneseconfig.json`;
        return undefined;
        // return await requireJsonFile(path);
    }


    private static setConfig(jsonConfigObject: any): void {
        if (!jsonConfigObject?.mapper?.create) {
            return;
        }
        if (jsonConfigObject.mapper.create.differentiateStringsAndNumbers === false) {
            CONFIG.create.differentiateStringsAndNumbers = false;
        }
        if (jsonConfigObject.mapper.create.throwTarget?.error === true) {
            CONFIG.create.throwTarget.error = true;
        }
        if (jsonConfigObject.mapper.create.throwTarget?.setToUndefined === true) {
            CONFIG.create.throwTarget.setToUndefined = true;
        }
    }
}
