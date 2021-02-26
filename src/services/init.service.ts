import { Project } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { CONFIG } from '../const/config.const';
import { InitConfigService } from './init-config.service';

const appRoot = require('app-root-path');

export class InitService {

    static async start(): Promise<void> {
        if (GLOBAL.isAlreadyInitialized) {
            return;
        }
        GLOBAL.debug ? this.createDebugProject() : this.createProject();
        GLOBAL.isAlreadyInitialized = true;
        this.setGlobalNodeModulePath();
        await InitConfigService.initConfig();
    }


    private static createProject(): void {
        GLOBAL.projectPath = appRoot;
        GLOBAL.project = new Project({
            tsConfigFilePath: GLOBAL.configFilePath,
            skipFileDependencyResolution: true
        });
    }


    private static createDebugProject(): void {
        GLOBAL.projectPath = process.cwd();
        GLOBAL.project = new Project({
            tsConfigFilePath: GLOBAL.configFilePath,
            skipFileDependencyResolution: true
        });
        GLOBAL.project.addSourceFilesAtPaths(`${GLOBAL.projectPath}/src/debug/**/*{.d.ts,.ts}`);
    }


    private static setGlobalNodeModulePath(): void {
        GLOBAL.nodeModulePath = GLOBAL.debug ? GLOBAL.projectPath : `${GLOBAL.projectPath}/node_modules/@genese/mapper`;
    }
}
