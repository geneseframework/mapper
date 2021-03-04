import { CONFIG } from '../../const/config.const';
import { Config } from '../../models/config.model';
import { requireJsonFile } from '../../utils/file-system.util';
import { GLOBAL } from '../../const/global.const';
import * as chalk from 'chalk';
import { CreateOptions } from '../../models/create-options.model';

export class InitConfigService {


    static async start(): Promise<void> {
        const jsonConfig: Config = await this.getJsonConfig();
        this.setConfig(jsonConfig);
    }


    private static async getJsonConfig(): Promise<object> {
        const path: string = `${GLOBAL.projectPath}/geneseconfig.json`;
        return await requireJsonFile(path);
    }


    private static setConfig(jsonConfigObject: any): void {
        if (jsonConfigObject?.mapper?.create) {
            for (const key of Object.keys(CONFIG)) {
                this.setCreateOption(jsonConfigObject, key);
            }
        }
    }


    private static setCreateOption(jsonConfigObject: any, optionName: string): void {
        if (jsonConfigObject.mapper.create?.hasOwnProperty(optionName)) {
            CONFIG.create[optionName] = jsonConfigObject.mapper.create[optionName];
        }
    }
}
