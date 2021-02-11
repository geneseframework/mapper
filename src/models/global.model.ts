import { Project } from 'ts-morph';
import { GLOBAL } from '../const/global.const';


export class Global {

    configFilePath: string = undefined;
    flaggedProject: Project = undefined;
    isAlreadyInitialized: boolean = false;
    project: Project = undefined;
    projectPath: string = undefined;


    get geneseMapperFolder(): string {
        return `${GLOBAL.projectPath}/dist/genese/mapper`;
    }

}



