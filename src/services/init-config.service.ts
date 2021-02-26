import { CONFIG } from '../const/config.const';
import { Config } from '../models/config.model';
import { requireFile } from '../utils/file-system.util';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';

export class InitConfigService {


    static async initConfig(): Promise<void> {
        const jsonConfig: Config = await this.getJsonConfig();
        CONFIG.createOptions = {
            differentiateStringsAndNumbers: undefined
        }
    }


    private static async getJsonConfig(): Promise<Config> {
        const path: string = `${GLOBAL.projectPath}/geneseconfig.json`;
        console.log(chalk.cyanBright('CONFIGGGGG'), path);
        await requireFile(path);
        console.log(chalk.cyanBright('CONFIGGGGG'), path);
        return undefined;
    }
}
