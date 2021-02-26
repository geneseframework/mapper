import { CONFIG } from '../const/config.const';
import { Config } from '../models/config.model';
import { requireFile } from '../utils/file-system.util';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';
import { Mapper } from '../models/mapper';

export class InitConfigService {


    static async initConfig(): Promise<void> {
        const jsonConfig: Config = await this.getJsonConfig();
        console.log(chalk.cyanBright('JSON CONFIGGGGG'), jsonConfig);
        this.addDefaultValues(jsonConfig);
        Object.assign(CONFIG, jsonConfig);
        console.log(chalk.greenBright('CONFIGGGGG'), CONFIG);
    }


    private static async getJsonConfig(): Promise<Config> {
        const path: string = `${GLOBAL.projectPath}/geneseconfig.json`;
        return this.parseConfig(await requireFile(path));
    }


    private static async parseConfig(jsonConfigObject: any): Promise<Config> {
        if (!jsonConfigObject?.mapper) {
            return undefined;
        }
        return undefined;
        // return await Mapper.create(Config, jsonConfigObject.mapper);
    }


    private static addDefaultValues(jsonConfig: Config): void {

    }
}
