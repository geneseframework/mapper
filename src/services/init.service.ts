import { Project } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';
const appRoot = require('app-root-path');

export class InitService {

    static start(): void {
        if (GLOBAL.isAlreadyInitialized) {
            return;
        }
        GLOBAL.debug ? this.createDebugProject() : this.createProject();
        GLOBAL.isAlreadyInitialized = true;
        console.log(chalk.greenBright('SRC FILESSSSSSSS'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()).length);
    }


    private static createProject(): void {
        console.log(chalk.greenBright('INITTTTTT'), appRoot);
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
}
