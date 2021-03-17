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
        INIT.project = new Project({skipFileDependencyResolution: true});
        this.initPaths();
        await ConfigService.init();
        INIT.debug ? this.initDebugProject() : this.initRealProject();
        await DeclarationInfoService.init();
        await InstanceGeneratorService.init();
        if (!INIT.debug) {
            await RefactoGlobalInitService.init();
        }
    }


    /**
     * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
     * @private
     */
    private static initPaths(): void {
        INIT.projectPath = INIT.debug ? `${process.cwd()}/src/debug/project` : appRoot;
        INIT.nodeModulePath = INIT.debug ? process.cwd() : `${INIT.projectPath}/node_modules/@genese/mapper`;
    }


    private static initDebugProject(): void {
        // INIT.projectPath = `${process.cwd()}/src/debug/project`;
        INIT.project = new Project({
            tsConfigFilePath: INIT.configFilePath,
            skipFileDependencyResolution: true
        });
        INIT.project.addSourceFilesAtPaths(`${INIT.projectPath}/src/debug/**/*{.d.ts,.ts}`);
        const distPath = process.cwd() + '/src/dist';
        INIT.project.addSourceFilesAtPaths(`${distPath}/*{.d.ts,.ts}`);
        INIT.nodeModulePath = process.cwd();
    }


    /**
     * Creates the Project object
     * @private
     */
    private static initRealProject(): void {
        // INIT.projectPath = appRoot;
        INIT.project = new Project({
            tsConfigFilePath: INIT.configFilePath,
            skipFileDependencyResolution: true
        });
        INIT.nodeModulePath = `${INIT.projectPath}/node_modules/@genese/mapper`;
    }


    /**
     * In debug mode, creates a Project based on the @genese/mapper module itself
     * @private
     */
    // static createDebugProject(): void {
    //     INIT.projectPath = `${process.cwd()}/src/debug/project`;
    //     INIT.project = new Project({
    //         tsConfigFilePath: INIT.configFilePath,
    //         skipFileDependencyResolution: true
    //     });
    //     INIT.project.addSourceFilesAtPaths(`${INIT.projectPath}/src/debug/**/*{.d.ts,.ts}`);
    //     const distPath = process.cwd() + '/src/dist';
    //     INIT.project.addSourceFilesAtPaths(`${distPath}/*{.d.ts,.ts}`);
    // }
}
