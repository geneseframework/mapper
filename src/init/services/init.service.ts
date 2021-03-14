import { Project } from 'ts-morph';
import { InstanceGeneratorService } from './instance-generator.service';
import { DeclarationInfoService } from './declaration-info.service';
import { INIT } from '../const/init.const';
import * as chalk from 'chalk';
import { throwError, throwWarning } from '../utils/errors.util';
import * as fs from 'fs';

const appRoot = require('app-root-path');

export class InitService {

    /**
     * Starts the initialization and the creation of the Instance Generator file
     */
    static async start(): Promise<void> {
        await this.init();
        await DeclarationInfoService.init();
        await InstanceGeneratorService.start();
    }


    /**
     * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
     * @private
     */
    private static async init(): Promise<void> {
        // INIT.appRoot = '../../../../../../../';
        await this.setGeneseConfig();
        INIT.debug ? this.createDebugProject() : this.createProject();
        INIT.nodeModulePath = INIT.debug ? process.cwd() : `${INIT.projectPath}/node_modules/@genese/creator`;
    }


    private static async setGeneseConfig(): Promise<void> {
        try {
            INIT.geneseConfigPath = INIT.debug ? `${process.cwd()}/geneseconfig.ts` : '../../../../../../../geneseconfig.ts';
            const geneseConfig: object = await this.getGeneseConfig();
            if (!geneseConfig) {
                throwError('in a browser environment, the file geneseconfig.ts is mandatory and must be at the root of your project.\nPlease refer to the documentation https://www.npmjs.com/package/genese/creator');
            } else {
                INIT.geneseConfig = geneseConfig;
            }
        } catch (err) {
            const message = 'Error: a file geneseconfig.ts must be at the root of your project.\nPlease refer to the documentation https://www.npmjs.com/package/genese/creator';
            throw Error(message);
        }
    }


    // TODO
    private static async getGeneseConfig(): Promise<object> {
        console.log('BEFORE IMPORTTTTT', INIT.geneseConfigPath, fs.existsSync(INIT.geneseConfigPath));
        console.log('BEFORE IMPORTTTTT', await require(INIT.geneseConfigPath)?.geneseConfig);
        // @ts-ignore
        const geneseConfig = fs.existsSync(INIT.geneseConfigPath) ? await require(INIT.geneseConfigPath)?.geneseConfig : undefined;
        // const geneseConfig = await import('../../../../../../../geneseconfig');
        console.log('AFTER IMPORTTTTT', geneseConfig);
        return geneseConfig;
    }


    /**
     * Creates the Project object
     * @private
     */
    private static createProject(): void {
        INIT.projectPath = '../../../../../../../';
        INIT.project = new Project({
            tsConfigFilePath: INIT.tsConfigPath,
            skipFileDependencyResolution: true
        });
    }


    /**
     * In debug mode, creates a Project based on the @genese/mapper module itself
     * @private
     */
    static createDebugProject(): void {
        INIT.projectPath = process.cwd();
        INIT.project = new Project({
            tsConfigFilePath: INIT.tsConfigPath,
            skipFileDependencyResolution: true
        });
        INIT.project.addSourceFilesAtPaths(`${INIT.projectPath}/src/debug/**/*{.d.ts,.ts}`);
        const distPath = process.cwd() + '/src/dist';
        INIT.project.addSourceFilesAtPaths(`${distPath}/*{.d.ts,.ts}`);
    }
}
