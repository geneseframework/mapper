import { INIT } from '../const/init.const';
import { throwError } from '../../create/utils/errors.util';
import { Config } from '../../shared/models/config.model';
import { Expression, ObjectLiteralExpression, PropertyAssignment, SourceFile, SyntaxKind } from 'ts-morph';
import { tab, tabs } from '../../shared/utils/strings.util';

export class ConfigService {


    static async init(): Promise<void> {
        const geneseConfigMapper: Config = await this.setConfig();
        const code: string = this.getConfigCode(geneseConfigMapper);
        await this.createGeneseConfigFile(code);
    }


    private static async setConfig(): Promise<Config | never> {
        const userConfigSourceFileCopy: SourceFile = INIT.project.addSourceFileAtPath(INIT.userGeneseConfigPath);
        if (!userConfigSourceFileCopy) {
            throwError(`geneseconfig.ts file not found. Please see the documentation : https://www.npmjs.com/package/genese/mapper`)
        } else {
            return this.updateGeneseConfigMapper(userConfigSourceFileCopy);
        }
    }


    private static updateGeneseConfigMapper(userConfigSourceFileCopy: SourceFile): Config {
        const newConfig = new Config();
        const configExpression: ObjectLiteralExpression = userConfigSourceFileCopy.getVariableStatement('geneseConfig').getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
        const config: ObjectLiteralExpression = this.getInitializer('mapper', configExpression) as ObjectLiteralExpression;
        if (config) {
            this.updateProperty('differentiateStringsAndNumbers', config, newConfig, 'false', false);
            // const throwTarget: ObjectLiteralExpression = this.getInitializer('throwTarget', config) as ObjectLiteralExpression;
            // if (throwTarget) {
            //     this.updateProperty('error', throwTarget, newConfig.throwTarget, 'true', true);
            //     this.updateProperty('setToUndefined', throwTarget, newConfig.throwTarget, 'true', true);
            // }
        }
        return newConfig;
    }


    private static getInitializer(name: string, expression: ObjectLiteralExpression): Expression {
        return this.getProperty(name, expression).getInitializer();
    }


    private static getProperty(name: string, expression: ObjectLiteralExpression): PropertyAssignment {
        return expression?.getProperty(name) as PropertyAssignment;
    }


    private static updateProperty(key: string, expression: ObjectLiteralExpression, obj: any, conditionValue: string, newValue: any): void {
        const text: string = this.getInitializer(key, expression)?.getText();
        if (text === conditionValue) {
            obj[key] = newValue;
        }
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
        INIT.project.createSourceFile(INIT.generatedConfigPath, code, {overwrite: true}).saveSync();
    }

}
