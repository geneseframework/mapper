import { Project, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from './instance-generator.model';
import * as chalk from 'chalk';


export class Global {

    configFilePath: string = undefined;
    debug = false;
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => T
    generateInstancesSourceFile: SourceFile = undefined;
    instanceGenerators: InstanceGenerator<any>[] = [];
    isAlreadyInitialized: boolean = false;
    mappers: string[] = [];
    nodeModuleMapper: SourceFile = undefined;
    project: Project = undefined;
    projectPath: string = undefined;
    private _projectWithNodeModules: Project = undefined;


    get geneseMapperFolder(): string {
        return `${GLOBAL.projectPath}/dist/genese/mapper`;
    }


    get isFirstMapper(): boolean {
        return this.mappers.length === 0;
    }


    get projectWithNodeModules(): Project {
        if (!this._projectWithNodeModules) {
            this._projectWithNodeModules = new Project({ tsConfigFilePath: this.configFilePath });
        }
        return this._projectWithNodeModules;
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



