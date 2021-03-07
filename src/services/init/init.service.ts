import { Project } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { InitConfigService } from './init-config.service';
import { InstanceGeneratorService } from '../instance-generator.service';
import { DeclarationInfoService } from './declaration-info.service';

const appRoot = require('app-root-path');

export class InitService {

    /**
     * Starts the initialization and the creation of the Instance Generator file
     */
    static async start(): Promise<void> {
        // GLOBAL.logDuration('START OF INIT PROCESS');
        if (GLOBAL.isFirstMapper) {
            await this.init();
            await DeclarationInfoService.init();
            await InstanceGeneratorService.start();
        }
        // GLOBAL.logDuration('END OF INIT PROCESS');
    }


    /**
     * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
     * @private
     */
    private static async init(): Promise<void> {
        if (GLOBAL.isAlreadyInitialized) {
            return;
        }
        GLOBAL.debug ? this.createDebugProject() : this.createProject();
        GLOBAL.isAlreadyInitialized = true;
        this.setGlobalNodeModulePath();
        await InitConfigService.start();
    }


    /**
     * Creates the Project object
     * @private
     */
    private static createProject(): void {
        GLOBAL.projectPath = appRoot;
        GLOBAL.project = new Project({
            tsConfigFilePath: GLOBAL.configFilePath,
            skipFileDependencyResolution: true
        });
    }


    /**
     * In debug mode, creates a Project based on the @genese/mapper module itself
     * @private
     */
    private static createDebugProject(): void {
        GLOBAL.projectPath = process.cwd();
        GLOBAL.project = new Project({
            tsConfigFilePath: GLOBAL.configFilePath,
            skipFileDependencyResolution: true
        });
        GLOBAL.project.addSourceFilesAtPaths(`${GLOBAL.projectPath}/src/debug/**/*{.d.ts,.ts}`);
    }


    /**
     * Sets GLOBAL.nodeModulePath with the path of the @genese/mapper module
     * @private
     */
    private static setGlobalNodeModulePath(): void {
        GLOBAL.nodeModulePath = GLOBAL.debug ? GLOBAL.projectPath : `${GLOBAL.projectPath}/node_modules/@genese/mapper`;
    }
}
