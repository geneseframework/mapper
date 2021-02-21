import { Project } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';
var appRoot = require('app-root-path');

export class InitService {

    static start(): void {
        if (GLOBAL.isAlreadyInitialized) {
            return;
        }
        console.log(chalk.greenBright('APPROOOOOOOOT'), appRoot);
        GLOBAL.projectPath = '/Users/utilisateur/Documents/perso_gilles_fabre/projets/kuzzy/repo';
        // GLOBAL.projectPath = '/Users/utilisateur/Documents/perso_gilles_fabre/genese/genesemapper/src/debug/project';
        // GLOBAL.projectPath = projectPath;
        GLOBAL.configFilePath = `${GLOBAL.projectPath}/tsconfig.json`;
        this.createProject();
        // GLOBAL.project.resolveSourceFileDependencies();
        GLOBAL.isAlreadyInitialized = true;
        console.log(chalk.greenBright('SRC FILESSSSSSSS'), GLOBAL.project.getSourceFiles().map(s => s.getBaseName()).length);
    }


    private static createProject(): void {
        GLOBAL.project = new Project({
            tsConfigFilePath: GLOBAL.configFilePath,
            skipFileDependencyResolution: true
        });
// TODO : remove hard code
        const nodeModuleMapperPath = `${GLOBAL.projectPath}/node_modules/@genese/mapper/dist/models/mapper.ts`;
        console.log(chalk.greenBright('APPROOOOOOOOT nodeModuleMapperPath'), nodeModuleMapperPath);
        GLOBAL.project.addSourceFileAtPath(nodeModuleMapperPath);
        GLOBAL.nodeModuleMapper = GLOBAL.project.getSourceFile(nodeModuleMapperPath);
        // TODO : remove hard code
        const generateInstancesPath = `${GLOBAL.projectPath}/node_modules/@genese/mapper/dist/utils/generate-instance.ts`;
        // const generateInstancesPath = `${GLOBAL.projectPath}/node_modules/genese/@genese-mapper/create-instance.ts`;
        console.log(chalk.greenBright('APPROOOOOOOOT generateInstancesPath'), generateInstancesPath);
        GLOBAL.project.addSourceFileAtPath(generateInstancesPath);
        GLOBAL.generateInstancesSourceFile = GLOBAL.project.getSourceFile(generateInstancesPath);
    }
}
