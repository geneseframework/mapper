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
    }


    private static createFlaggedProject(): void {
        GLOBAL.flaggedProject = new Project();
    }
}
