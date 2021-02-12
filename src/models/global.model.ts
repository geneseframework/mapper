import { Project, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { ClassConstructor } from './t-constructor.model';
import { Mapper } from './mapper';


export class Global {

    configFilePath: string = undefined;
    createInstancesPath: string = undefined;
    createInstancesSourceFile: SourceFile = undefined;
    flaggedProject: Project = undefined;
    isAlreadyInitialized: boolean = false;
    mappers: Mapper<any>[] = [];
    nodeModuleMapper: SourceFile = undefined;
    project: Project = undefined;
    projectPath: string = undefined;


    get geneseMapperFolder(): string {
        return `${GLOBAL.projectPath}/dist/genese/mapper`;
    }


    get isFirstMapper(): boolean {
        return this.mappers.length === 0;
    }



}



