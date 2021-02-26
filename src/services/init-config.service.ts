import { CONFIG } from '../const/config.const';
import { Config } from '../models/config.model';
import { requireFile } from '../utils/file-system.util';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';
import { Mapper } from '../models/mapper';

export class InitConfigService {


    static async initConfig(): Promise<void> {
        const jsonConfig: Config = await this.getJsonConfig();
        CONFIG.create = {
            differentiateStringsAndNumbers: undefined
        }
    }


    private static async getJsonConfig(): Promise<Config> {
        const path: string = `${GLOBAL.projectPath}/geneseconfig.json`;
        console.log(chalk.cyanBright('CONFIGGGGG'), path);
        return this.parseConfig(await requireFile(path));
    }


    private static async parseConfig(jsonConfigObject: any): Promise<Config> {
        if (!jsonConfigObject?.mapper) {
            return undefined;
        }
        console.log(chalk.cyanBright('CONFIGGGGG'), jsonConfigObject);
        const jsonConfig: Config = await Mapper.create(Config, jsonConfigObject.mapper);
        console.log(chalk.cyanBright('CONFIGGGGG'), jsonConfig);
        return jsonConfig;

    }
}
