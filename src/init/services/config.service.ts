import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import { INIT } from '../const/init.const';
import { throwError } from '../../create/utils/errors.util';
import { Config } from '../../shared/models/config.model';
import { tab, tabs } from '../utils/native/strings.util';
import {
    Expression,
    ObjectLiteralExpression,
    PropertyAssignment,
    PropertyAssignmentStructure,
    SourceFile,
    SyntaxKind
} from 'ts-morph';

export class ConfigService {


    static async init(): Promise<void> {
        const geneseConfigMapper: Config = await this.getUserConfig();
        const code: string = this.getConfigCode(geneseConfigMapper);
        console.log(chalk.blueBright('NEW GENESE CODEEEEE'), code);
        await this.createGeneseConfigFile(code);
    }


    private static async getUserConfig(): Promise<Config | never> {
        // const content: any = await this.getUserConfigFileContent();
        // console.log(chalk.blueBright('USERR CONFIG CONTENTTTTT'), content);
        const userConfigSourceFileCopy: SourceFile = INIT.project.addSourceFileAtPath(INIT.userGeneseConfigPath);
        console.log(chalk.blueBright('USERR CONFIG CONTENTTTTT'), userConfigSourceFileCopy?.getFullText());
        if (!userConfigSourceFileCopy) {
            throwError(`geneseconfig.ts file not found. Please see the documentation : https://www.npmjs.com/package/genese/mapper`)
            // throwError(`geneseconfig.ts file has incorrect format. Please see the documentation : https://www.npmjs.com/package/genese/mapper`)
        } else {
            return this.updateGeneseConfigMapper(userConfigSourceFileCopy);
        }
    }


    private static async getUserConfigFileContent(): Promise<any | never> {
        try {
            return fs.readFileSync(INIT.userGeneseConfigPath, {encoding: 'utf-8'});
            // return await require(INIT.userGeneseConfigPath);
        } catch (err) {
            throwError(`impossible to create config file : `, INIT.userGeneseConfigPath);
        }
    }


    private static updateGeneseConfigMapper(userConfigSourceFileCopy: SourceFile): Config {
        const newConfig = new Config();
        const configExpression: ObjectLiteralExpression = userConfigSourceFileCopy.getVariableStatement('geneseConfig').getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
        const config: ObjectLiteralExpression = this.getInitializer('mapper', configExpression) as ObjectLiteralExpression;
        console.log(chalk.magentaBright('CONFIGGGGG'), config.getKindName());
        if (config) {
            const differentiateStringsAndNumbers: string = this.getInitializer('differentiateStringsAndNumbers', config).getText();
            console.log(chalk.cyanBright('DIFFFFF'), differentiateStringsAndNumbers);
            if (differentiateStringsAndNumbers === 'false') {
                newConfig.differentiateStringsAndNumbers = false;
            }
            const throwTarget: ObjectLiteralExpression = this.getInitializer('throwTarget', config) as ObjectLiteralExpression;
            console.log(chalk.cyanBright('THROWTGT'), throwTarget);
            if (throwTarget) {
                const err: string = this.getInitializer('error', throwTarget).getText();
                console.log(chalk.yellowBright('ERRRRRRR'), err);
                if (err === 'true') {
                    newConfig.throwTarget.error = true;
                }
                const setToUndefined: string = this.getInitializer('setToUndefined', throwTarget).getText();
                console.log(chalk.yellowBright('DIFFsetToUndefinedFFF'), setToUndefined);
                if (setToUndefined== 'true') {
                    newConfig.throwTarget.setToUndefined = true;
                }
            }
        }
        console.log(chalk.magentaBright('GENESE defaultConfig'), newConfig);
        return newConfig;
    }


    private static getInitializer(name: string, expression: ObjectLiteralExpression): Expression {
        return this.getProperty(name, expression).getInitializer();
    }


    private static getProperty(name: string, expression: ObjectLiteralExpression): PropertyAssignment {
        return expression?.getProperty(name) as PropertyAssignment;
    }


    private static getConfigCode(geneseConfigMapper: Config): string {
        return this.declareConstCode() +
            `${tab}differentiateStringsAndNumbers: ${geneseConfigMapper.differentiateStringsAndNumbers.toString()},\n` +
            `${tab}throwTarget: {\n` +
            `${tabs(2)}error: ${geneseConfigMapper.throwTarget.error},\n` +
            `${tabs(2)}setToUndefined: ${geneseConfigMapper.throwTarget.setToUndefined},\n` +
            `${tab}}\n` +
            `}\n` +
            this.exportsCode();
    }


    private static declareConstCode(): string {
        return INIT.debug ? `const config = {\n` : `export var config = {\n`;
    }


    private static exportsCode(): string {
        return INIT.debug ? `exports.config = config;\n` : `\n`;
    }


    private static async createGeneseConfigFile(code: string): Promise<void> {
        const soruceFile = INIT.project.createSourceFile(INIT.generatedConfigPath, code, {overwrite: true});
        console.log(chalk.blueBright('SORUCEFILLLLLL'), soruceFile?.getBaseName());
        soruceFile.saveSync();
    }

}
