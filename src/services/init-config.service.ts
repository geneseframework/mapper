import { CONFIG } from '../const/config.const';
import { Config } from '../models/config.model';
import { requireJsonFile } from '../utils/file-system.util';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';

export class InitConfigService {


    static async initConfig(): Promise<void> {
        const jsonConfig: Config = await this.getJsonConfig();
        this.setConfig(jsonConfig);
        console.log(chalk.magentaBright('CONFIGGGGG'), CONFIG);
    }


    private static async getJsonConfig(): Promise<object> {
        const path: string = `${GLOBAL.projectPath}/geneseconfig.json`;
        return await requireJsonFile(path);
    }


    private static setConfig(jsonConfigObject: any): void {
        if (jsonConfigObject?.mapper) {
            if (jsonConfigObject.mapper.create?.hasOwnProperty('differentiateStringsAndNumbers')) {
                CONFIG.create.differentiateStringsAndNumbers = jsonConfigObject.mapper.create.differentiateStringsAndNumbers !== false;
            }
        }
    // CONFIG.create.differentiateStringsAndNumbers = jsonConfigObject.mapper.create?.hasOwnProperty('differentiateStringsAndNumbers') ? jsonConfigObject.mapper.create.differentiateStringsAndNumbers : CONFIG.create.differentiateStringsAndNumbers;
    //     const config: Config = {
    //         create: {}
    //     };
    //     if (!jsonConfigObject.mapper.create) {
    //         config.create = CONFIG.create;
    //     } else {
    //         config.create.differentiateStringsAndNumbers = jsonConfigObject.mapper.create.hasOwnProperty('differentiateStringsAndNumbers') ? jsonConfigObject.mapper.create.differentiateStringsAndNumbers : CONFIG.create.differentiateStringsAndNumbers;
    //     }
    //     return undefined;
    }
}
