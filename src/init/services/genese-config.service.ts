import { defaultGeneseConfig } from '../../create/const/default-geneseconfig.const';
import * as chalk from 'chalk';
import { INIT } from '../const/init.const';
import { throwError, throwWarning } from '../../create/utils/errors.util';
import { GeneseConfig } from '../../shared/models/genese-config.model';
import { Config } from '../../shared/models/config.model';
import { tab, tabs } from '../utils/native/strings.util';

export class GeneseConfigService {


    static async init(): Promise<void> {
        const geneseConfigMapper: Config = await this.getUserConfig();
        console.log(chalk.magentaBright('GENESE geneseConfigUser'), geneseConfigMapper);
        const code: string = this.getConfigCode(geneseConfigMapper);
        console.log(chalk.blueBright('NEW GENESE CODEEEEE'), code);
        await this.createGeneseConfigFile(code);
    }


    private static async getUserConfig(): Promise<Config> {
        const content: any = await this.getUserConfigFileContent();
        const geneseConfigMapperUser: any = content?.geneseConfig?.mapper;
        console.log(chalk.greenBright('USER GENESE CONFIGGGGG'), geneseConfigMapperUser);
        if (!geneseConfigMapperUser) {
            throwError(`geneseconfig.ts file has incorrect format. Please see the documentation : https://www.npmjs.com/package/genese/mapper`)
        } else {
            return this.updateGeneseConfigMapper(geneseConfigMapperUser);
        }
    }


    private static async getUserConfigFileContent(): Promise<any> {
        try {
            return await require(INIT.userGeneseConfigPath);
        } catch (err) {
            throwError(`geneseconfig.ts file not found at your project's root : `, INIT.generatedConfigPath);
        }
    }


    private static updateGeneseConfigMapper(geneseConfigMapperUser: any): Config {
        const defaultConfig = new Config();
        if (geneseConfigMapperUser.differentiateStringsAndNumbers === false) {
            defaultConfig.differentiateStringsAndNumbers = false;
        }
        if (geneseConfigMapperUser.throwTarget?.error === true) {
            defaultConfig.throwTarget.error = true;
        }
        if (geneseConfigMapperUser.throwTarget?.setToUndefined === true) {
            defaultConfig.throwTarget.setToUndefined = true;
        }
        console.log(chalk.magentaBright('GENESE defaultConfig'), defaultConfig);
        return defaultConfig;
    }


    private static getConfigCode(geneseConfigMapper: Config): string {
        return `export var config = {\n` +
            `${tab}differentiateStringsAndNumbers: ${geneseConfigMapper.differentiateStringsAndNumbers.toString()},\n` +
            `${tab}throwTarget: {\n` +
            `${tabs(2)}error: ${geneseConfigMapper.throwTarget.error},\n` +
            `${tabs(2)}setToUndefined: ${geneseConfigMapper.throwTarget.setToUndefined},\n` +
            `${tab}}\n` +
            `}\n`;
    }


    private static async createGeneseConfigFile(code: string): Promise<void> {
        const soruceFile = INIT.project.createSourceFile(INIT.generatedConfigPath, code, {overwrite: true});
        console.log(chalk.blueBright('SORUCEFILLLLLL'), soruceFile?.getBaseName());
        soruceFile.saveSync();
    }

}
