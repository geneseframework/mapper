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
import { isArray } from '../../create/utils/native/arrays.util';

export class ConfigService {


    static async init(): Promise<MapperConfig> {
        const mapperConfig: MapperConfig = await this.setConfig();
        const code: string = this.getConfigCode(mapperConfig);
        await this.createGeneseConfigFile(code);
        return mapperConfig;
    }


    static async setConfig(): Promise<MapperConfig | never> {
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
            this.updateStringArrayProperty('include', config, newConfig);
            this.updateStringArrayProperty('tsConfigs', config, newConfig);
        }
        // console.log(chalk.greenBright('NEW CONFIGGGGG'), newConfig);
        return newConfig;
    }


    private static getInitializer(name: string, expression: ObjectLiteralExpression): Expression {
        return this.getProperty(name, expression)?.getInitializer();
    }


    private static getProperty(name: string, expression: ObjectLiteralExpression): PropertyAssignment {
        return expression?.getProperty(name) as PropertyAssignment;
    }


    private static updateStringArrayProperty(key: string, config: ObjectLiteralExpression, newConfig: MapperConfig): void {
        const initializer: ArrayLiteralExpression = this.getInitializer(key, config) as ArrayLiteralExpression;
        if (initializer) {
            this.updateStringArray(key, initializer, newConfig);
        }
    }


    private static updateStringArray(key: string, expression: ArrayLiteralExpression, obj: any): void {
        for (const element of expression?.getElements()) {
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


    static addConfigFilesToProject(mapperConfig: MapperConfig): void {
        this.addConfigIncludedFiles(mapperConfig);
        this.addTsConfigFiles(mapperConfig);
    }


    private static addConfigIncludedFiles(mapperConfig: MapperConfig): void {
        const filePaths = this.normalizePaths(mapperConfig?.include);
        INIT.project.addSourceFilesAtPaths(filePaths);
    }


    private static addTsConfigFiles(mapperConfig: MapperConfig): void {
        if (!isArray(mapperConfig?.tsConfigs) || mapperConfig.tsConfigs.length === 0) {
            INIT.project.addSourceFilesFromTsConfig(INIT.defaultTsConfigPath);
        } else {
            const tsConfigPaths = this.normalizePaths(mapperConfig?.tsConfigs);
            for (const tsConfigPath of tsConfigPaths) {
                INIT.project.addSourceFilesFromTsConfig(tsConfigPath);
            }
        }
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
