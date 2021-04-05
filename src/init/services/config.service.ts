import { INIT } from '../const/init.const';
import { ArrayLiteralExpression, ObjectLiteralExpression, SourceFile, SyntaxKind } from 'ts-morph';
import * as fs from 'fs-extra';
import { getInitializer } from '../utils/ast/ast-property.util';
import { isArray, MapperConfig, removeBorders, tab, tabs } from '@genese/core';

const path = require('path');

/**
 * Generates the config.js file from the user's geneseconfig.ts file and the default config
 */
export class ConfigService {


    /**
     * Returns the MapperConfig object after have created the config.js file from the user's geneseconfig.ts file and the default config
     */
    static async init(): Promise<MapperConfig> {
        const mapperConfig: MapperConfig = await this.setConfig();
        const code: string = this.getConfigCode(mapperConfig);
        await this.createGeneseConfigFile(code);
        return mapperConfig;
    }

    /**
     * Returns the MapperConfig of the geneseconfig.ts file if exists and new MapperConfig if not
     */
    static async setConfig(): Promise<MapperConfig | never> {
        if (this.geneseConfigFileExists()) {
            const userConfigSourceFile: SourceFile = INIT.project.addSourceFileAtPath(INIT.userGeneseConfigPath);
            return this.getMapperConfig(userConfigSourceFile);
        } else {
            return new MapperConfig();
        }
    }

    /**
     * Checks if the geneseconfig.ts file exists
     * @private
     */
    private static geneseConfigFileExists(): boolean {
        return fs.existsSync(INIT.userGeneseConfigPath);
    }

    /**
     * Returns MapperConfig object created from the geneseconfig.ts file
     * @param userConfigSourceFile  // The SourceFile of the geneseconfig.ts file
     * @private
     */
    private static getMapperConfig(userConfigSourceFile: SourceFile): MapperConfig {
        const newConfig = new MapperConfig();
        const configExpression: ObjectLiteralExpression = userConfigSourceFile.getVariableStatement('geneseConfig').getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
        const config: ObjectLiteralExpression = getInitializer('mapper', configExpression) as ObjectLiteralExpression;
        if (config) {
            const behavior: ObjectLiteralExpression = getInitializer('behavior', config) as ObjectLiteralExpression;
            if (behavior) {
                this.updateObjectProperty('differentiateStringsAndNumbers', behavior, newConfig.behavior, 'false', false);
            }
            this.updateStringArrayProperty('include', config, newConfig);
            this.updateStringArrayProperty('tsConfigs', config, newConfig);
        }
        return newConfig;
    }

    /**
     * Updates geneseconfig property which is an array of strings from the config defined in the geneseconfig.ts file of the user
     * @param key           // The key of the property
     * @param config        // The current MapperConfig
     * @param newConfig     // The new MapperConfig
     * @private
     */
    private static updateStringArrayProperty(key: string, config: ObjectLiteralExpression, newConfig: MapperConfig): void {
        const initializer: ArrayLiteralExpression = getInitializer(key, config) as ArrayLiteralExpression;
        if (initializer) {
            this.updateStringArray(key, initializer, newConfig);
        }
    }

    /**
     * Updates an element of the geneseconfig property which is an array of strings
     * @param key           // The key of the property
     * @param expression    // The ArrayLiteral from the geneseconfig.ts file of the user
     * @param obj           // The object to update for the given key
     * @private
     */
    private static updateStringArray(key: string, expression: ArrayLiteralExpression, obj: any): void {
        for (const element of expression?.getElements()) {
            obj[key].push(removeBorders(element.getText()));
        }
    }

    /**
     * Updates geneseconfig property which is an object from the config defined in the geneseconfig.ts file of the user
     * @param key               // The key of the property
     * @param expression        // The ObjectLiteralExpression from the geneseconfig.ts file of the user
     * @param obj               // The object to update for the given key
     * @param conditionValue    // Eventual condition value
     * @param newValue          // The new condition value
     * @private
     */
    private static updateObjectProperty(key: string, expression: ObjectLiteralExpression, obj: any, conditionValue: string, newValue: any): void {
        const text: string = getInitializer(key, expression)?.getText();
        if (text === conditionValue) {
            obj[key] = newValue;
        }
    }

    /**
     * Returns the code corresponding to the generated config.js file
     * @param geneseConfigMapper
     * @private
     */
    private static getConfigCode(geneseConfigMapper: MapperConfig): string {
        return `const config = {\n` +
            `${tab}behavior: {\n` +
            `${tabs(2)}differentiateStringsAndNumbers: ${geneseConfigMapper.behavior.castStringsAndNumbers.toString()},\n` +
            `${tab}}\n` +
            `}\n` +
            `exports.config = config;\n`;
    }

    /**
     * Generates the config.js file
     * @param code      // The code of the config.js file
     * @private
     */
    private static async createGeneseConfigFile(code: string): Promise<void> {
        INIT.project.createSourceFile(INIT.generatedConfigPath, code, {overwrite: true}).saveSync();
    }

    /**
     * Adds all files defined by the MapperConfig to the project to analyze
     * @param mapperConfig  // The config defined previously
     */
    static addConfigFilesToProject(mapperConfig: MapperConfig): void {
        this.addConfigIncludedFiles(mapperConfig);
        this.addTsConfigFiles(mapperConfig);
    }

    /**
     * Adds files from the 'include' option of the GeneseConfig
     * @param mapperConfig  // The config defined previously
     * @private
     */
    private static addConfigIncludedFiles(mapperConfig: MapperConfig): void {
        const filePaths = this.normalizePaths(mapperConfig?.include);
        INIT.project.addSourceFilesAtPaths(filePaths);
    }

    /**
     * Adds files from the 'tsConfigs' option of the GeneseConfig
     * @param mapperConfig  // The config defined previously
     * @private
     */
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

    /**
     * Returns absolute paths from paths declared in the GeneseConfig options
     * @param filePaths // The paths of the files to add
     * @private
     */
    private static normalizePaths(filePaths: string[]): string[] {
        const normalizedPaths: string[] = [];
        for (const filePath of filePaths) {
            normalizedPaths.push(this.normalizePath(filePath));
        }
        return normalizedPaths;
    }

    /**
     * Returns absolute path
     * @param filePath // The path of the file
     * @private
     */
    private static normalizePath(filePath: string): string {
        return path.isAbsolute(filePath) ? filePath : `${INIT.projectPath}/${filePath}`;
    }

}
