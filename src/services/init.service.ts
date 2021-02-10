import { Project } from 'ts-morph';
import { GLOBAL } from '../const/global.const';

export class InitService {

    static start(): void {
        GLOBAL.projectPath = '/Users/utilisateur/Documents/perso_gilles_fabre/genese/genese-mapper/project';
        // GLOBAL.projectPath = projectPath;
        GLOBAL.configFilePath = `${GLOBAL.projectPath}/tsconfig.json`;
        this.createProject();
    }


    private static createProject(): void {
        GLOBAL.project = new Project({
            tsConfigFilePath: GLOBAL.configFilePath,
        });
    }
}
