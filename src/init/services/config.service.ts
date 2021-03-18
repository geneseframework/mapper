import { INIT } from '../const/init.const';
import { throwError } from '../../create/utils/errors.util';
import { MapperConfig } from '../../shared/models/config.model';
import {
    ArrayLiteralExpression,
    Expression,
    ObjectLiteralExpression,
    PropertyAssignment,
    SourceFile,
    SyntaxKind
} from 'ts-morph';
import { removeBorders, tab, tabs } from '../../shared/utils/strings.util';
import * as chalk from 'chalk';
import path = require('path');

export class ConfigService {


    static async init(): Promise<MapperConfig> {
        const mapperConfig: MapperConfig = await this.setConfig();
        const code: string = this.getConfigCode(mapperConfig);
        await this.createGeneseConfigFile(code);
        return mapperConfig;
    }


    private static async setConfig(): Promise<MapperConfig | never> {
        const userConfigSourceFileCopy: SourceFile = INIT.project.addSourceFileAtPath(INIT.userGeneseConfigPath);
        if (!userConfigSourceFileCopy) {
            throwError(`geneseconfig.ts file not found. Please see the documentation : https://www.npmjs.com/package/genese/mapper`)
        } else {
            return this.updateGeneseConfigMapper(userConfigSourceFileCopy);
        }
    }


    private static updateGeneseConfigMapper(userConfigSourceFileCopy: SourceFile): MapperConfig {
        const newConfig = new MapperConfig();
        const configExpression: ObjectLiteralExpression = userConfigSourceFileCopy.getVariableStatement('geneseConfig').getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
        const config: ObjectLiteralExpression = this.getInitializer('mapper', configExpression) as ObjectLiteralExpression;
        if (config) {
            const behavior: ObjectLiteralExpression = this.getInitializer('behavior', config) as ObjectLiteralExpression;
            if (behavior) {
                this.updateObjectProperty('differentiateStringsAndNumbers', behavior, newConfig.behavior, 'false', false);
            }
            const includes: ArrayLiteralExpression = this.getInitializer('include', config) as ArrayLiteralExpression;
            console.log(chalk.magentaBright('INCLUDESSSS'), includes?.getKindName());
            if (includes) {
                this.updateStringArrayProperty('include', includes, newConfig);
            }
            // const throwTarget: ObjectLiteralExpression = this.getInitializer('throwTarget', config) as ObjectLiteralExpression;
            // if (throwTarget) {
            //     this.updateProperty('error', throwTarget, newConfig.throwTarget, 'true', true);
            //     this.updateProperty('setToUndefined', throwTarget, newConfig.throwTarget, 'true', true);
            // }
        }
        console.log(chalk.greenBright('NEW CONFIGGGGG'), newConfig);
        return newConfig;
    }


    private static getInitializer(name: string, expression: ObjectLiteralExpression): Expression {
        return this.getProperty(name, expression)?.getInitializer();
    }


    private static getProperty(name: string, expression: ObjectLiteralExpression): PropertyAssignment {
        return expression?.getProperty(name) as PropertyAssignment;
    }


    private static updateStringArrayProperty(key: string, expression: ArrayLiteralExpression, obj: any): void {
        for (const element of expression?.getElements()) {
            console.log(chalk.cyanBright('ELTTTTT'), element.getText());
            obj[key].push(removeBorders(element.getText()));
        }
    }


    private static updateObjectProperty(key: string, expression: ObjectLiteralExpression, obj: any, conditionValue: string, newValue: any): void {
        const text: string = this.getInitializer(key, expression)?.getText();
        if (text === conditionValue) {
            obj[key] = newValue;
        }
    }


    private static getConfigCode(geneseConfigMapper: MapperConfig): string {
        return this.declareConstCode() +
            `${tab}behavior: {\n` +
            `${tabs(2)}differentiateStringsAndNumbers: ${geneseConfigMapper.behavior.differentiateStringsAndNumbers.toString()},\n` +
            `${tab}}\n` +
            // `${tab}throwTarget: {\n` +
            // `${tabs(2)}error: ${geneseConfigMapper.throwTarget.error},\n` +
            // `${tabs(2)}setToUndefined: ${geneseConfigMapper.throwTarget.setToUndefined},\n` +
            // `${tab}}\n` +
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


    static addConfigIncludedFiles(mapperConfig: MapperConfig): void {
        const filePaths = this.normalizePaths(mapperConfig?.include);
        // const filePaths = mapperConfig.include.map(path => `${INIT.projectPath}/${path}`);
        console.log(chalk.yellowBright('FPATHHHHHS'), filePaths);
        INIT.project.addSourceFilesAtPaths(filePaths);
    }


    private static normalizePaths(filePaths: string[]): string[] {
        const normalizedPaths: string[] = [];
        for (const filePath of filePaths) {
            normalizedPaths.push(this.normalizePath(filePath));
        }
        return normalizedPaths;
    }


    private static normalizePath(filePath: string): string {
        return path.isAbsolute(filePath) ? filePath : `${INIT.projectPath}/${filePath}`;
    }

}
