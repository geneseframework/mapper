import { Project, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { Mapper } from './mapper';
import { InstanceGenerator } from './instance-generator.model';
import * as chalk from 'chalk';


export class Global {

    configFilePath: string = undefined;
    debug = false;
    // createInstancesPath: string = undefined;
    flaggedProject: Project = undefined;
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => T
    generateInstancesSourceFile: SourceFile = undefined;
    instanceGenerators: InstanceGenerator<any>[] = [];
    isAlreadyInitialized: boolean = false;
    mappers: string[] = [];
    // mappers: Mapper<any>[] = [];
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


    log(message: string, value: any, predicate: boolean): void {
        if (predicate) {
            console.log(chalk.yellowBright(message), value);
        }
    }

}



