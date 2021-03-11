import { Project } from 'ts-morph';
import { InitConfigService } from './init-config.service';
import { InstanceGeneratorService } from './instance-generator.service';
import { DeclarationInfoService } from './declaration-info.service';
import { INIT } from './init.const';
import * as chalk from 'chalk';

const appRoot = require('app-root-path');

export class InitService {

    /**
     * Starts the initialization and the creation of the Instance Generator file
     */
    static async start(): Promise<void> {
        if (INIT.isFirstMapper) {
            await this.init();
            await DeclarationInfoService.init();
            await InstanceGeneratorService.start();
        }
    }


    /**
     * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
     * @private
     */
    private static async init(): Promise<void> {
        console.log(chalk.blueBright('debugggg'), INIT.debug);
        INIT.debug ? this.createDebugProject() : this.createProject();
        this.setGlobalNodeModulePath();
        await InitConfigService.start();
    }


    /**
     * Creates the Project object
     * @private
     */
    private static createProject(): void {
        INIT.projectPath = appRoot;
        INIT.project = new Project({
            tsConfigFilePath: INIT.configFilePath,
            skipFileDependencyResolution: true
        });
    }


    /**
     * In debug mode, creates a Project based on the @genese/mapper module itself
     * @private
     */
    private static createDebugProject(): void {
        INIT.projectPath = `${process.cwd()}/src/debug/project`;
        INIT.project = new Project({
            tsConfigFilePath: INIT.configFilePath,
            skipFileDependencyResolution: true
        });
        INIT.project.addSourceFilesAtPaths(`${INIT.projectPath}/src/debug/**/*{.d.ts,.ts}`);
    }


    /**
     * Sets INIT.nodeModulePath with the path of the @genese/mapper module
     * @private
     */
    private static setGlobalNodeModulePath(): void {
        // INIT.nodeModulePath = `${INIT.projectPath}/node_modules/@genese/mapper`;
        INIT.nodeModulePath = INIT.debug ? INIT.projectPath : `${INIT.projectPath}/node_modules/@genese/mapper`;
    }
}
