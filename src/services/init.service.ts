import { Project } from 'ts-morph';
import { GLOBAL } from '../const/global.const';

export class InitService {

    static start(): void {
        if (GLOBAL.isAlreadyInitialized) {
            return;
        }
        // TODO : flaggedfile
        GLOBAL.projectPath = '/Users/utilisateur/Documents/perso_gilles_fabre/genese/genesemapper/src/debug/project';
        // GLOBAL.projectPath = projectPath;
        GLOBAL.configFilePath = `${GLOBAL.projectPath}/tsconfig.json`;
        this.createProject();
        this.createFlaggedProject();
        GLOBAL.isAlreadyInitialized = true;
    }


    private static createProject(): void {
        GLOBAL.project = new Project({
            tsConfigFilePath: GLOBAL.configFilePath,
            skipFileDependencyResolution: true
        });
        // TODO : remove hard code
        const nodeModuleMapperPath = `/Users/utilisateur/Documents/perso_gilles_fabre/genese/genesemapper/src/models/mapper.ts`;
        GLOBAL.project.addSourceFileAtPath(nodeModuleMapperPath);
        GLOBAL.nodeModuleMapper = GLOBAL.project.getSourceFile(nodeModuleMapperPath);
        // TODO : remove hard code
        const generateInstancesPath = `/Users/utilisateur/Documents/perso_gilles_fabre/genese/genesemapper/src/utils/generate-instance.ts`;
        // const generateInstancesPath = `${GLOBAL.projectPath}/node_modules/genese/@genese-mapper/create-instance.ts`;
        GLOBAL.project.addSourceFileAtPath(generateInstancesPath);
        GLOBAL.generateInstancesSourceFile = GLOBAL.project.getSourceFile(generateInstancesPath);
    }


    private static createFlaggedProject(): void {
        GLOBAL.flaggedProject = new Project();
    }
}
