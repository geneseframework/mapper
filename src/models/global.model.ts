import { Project, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { TConstructor } from './t-constructor.model';
import { Mapper } from './mapper';
import { InstanceGenerator } from './instance-generator.model';


export class Global {

    configFilePath: string = undefined;
    createInstancesPath: string = undefined;
    flaggedProject: Project = undefined;
    generateInstancesSourceFile: SourceFile = undefined;
    instanceGenerators: InstanceGenerator<any>[] = [];
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


    addInstanceGenerator(instanceGenerator: InstanceGenerator<any>): void {
        const iGenerator: InstanceGenerator<any> = this.instanceGenerators.find(i => i.id === instanceGenerator.id);
        if (!iGenerator) {
            this.instanceGenerators.push(instanceGenerator);
        }
    }



}



