import { Project } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { Global } from '../models/global.model';

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
        });
        // TODO : remove hard code
        const nodeModuleMapperPath = `/Users/utilisateur/Documents/perso_gilles_fabre/genese/genesemapper/src/models/mapper.ts`;
        GLOBAL.createInstancesPath = `${GLOBAL.projectPath}/node_modules/genese/@genese-mapper/create-instance.ts`;
        GLOBAL.project.addSourceFileAtPath(nodeModuleMapperPath);
        // GLOBAL.project.addSourceFileAtPath(`${GLOBAL.projectPath}/node_modules/@genese-mapper/src/models/mapper.ts`);
        GLOBAL.nodeModuleMapper = GLOBAL.project.getSourceFile(nodeModuleMapperPath);
    }


    private static createFlaggedProject(): void {
        GLOBAL.flaggedProject = new Project();
    }
}
