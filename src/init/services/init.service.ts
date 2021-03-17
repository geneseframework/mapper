import { Project } from 'ts-morph';
import { InstanceGeneratorService } from './instance-generator.service';
import { DeclarationInfoService } from './declaration-info.service';
import { INIT } from '../const/init.const';
import { RefactoGlobalInitService } from './refacto-global-init.service';
import { ConfigService } from './config.service';
import * as chalk from 'chalk';

const appRoot = require('app-root-path');

export class InitService {

    /**
     * Starts the initialization and the creation of the Instance Generator file
     */
    static async start(): Promise<void> {
        await this.init();
        await DeclarationInfoService.init();
        await InstanceGeneratorService.init();
        await ConfigService.init();
        if (!INIT.debug) {
            console.log(chalk.greenBright('USER GENESE DBG'), INIT.debug);
            await RefactoGlobalInitService.init();
        }
    }


    /**
     * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
     * @private
     */
    private static async init(): Promise<void> {
        INIT.debug ? this.createDebugProject() : this.createProject();
        INIT.nodeModulePath = INIT.debug ? process.cwd() : `${INIT.projectPath}/node_modules/@genese/creator`;
    }


    /**
     * Creates the Project object
     * @private
     */
    private static createProject(): void {
        INIT.projectPath = appRoot;
        console.log('APP ROOOOOt INIT.projectPath', INIT.projectPath)
        console.log('APP INIT.configFilePath', INIT.configFilePath)
        INIT.project = new Project({
            tsConfigFilePath: INIT.configFilePath,
            skipFileDependencyResolution: true
        });
    }


    /**
     * In debug mode, creates a Project based on the @genese/mapper module itself
     * @private
     */
    static createDebugProject(): void {
        INIT.projectPath = `${process.cwd()}/src/debug/project`;
        INIT.project = new Project({
            tsConfigFilePath: INIT.configFilePath,
            skipFileDependencyResolution: true
        });
        INIT.project.addSourceFilesAtPaths(`${INIT.projectPath}/src/debug/**/*{.d.ts,.ts}`);
        const distPath = process.cwd() + '/src/dist';
        INIT.project.addSourceFilesAtPaths(`${distPath}/*{.d.ts,.ts}`);
    }
}
