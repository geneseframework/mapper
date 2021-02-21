import { Project, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from './instance-generator.model';
import * as chalk from 'chalk';


export class Global {

    debug = false;
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => T
    instanceGenerators: InstanceGenerator<any>[] = [];
    instanceGeneratorSourceFile: SourceFile = undefined;
    isAlreadyInitialized: boolean = false;
    mapperSourceFile: SourceFile = undefined;
    nodeModulePath: string = undefined;
    project: Project = undefined;
    projectPath: string = undefined;
    private _projectWithNodeModules: Project = undefined;


    get configFilePath(): string {
        return `${GLOBAL.projectPath}/tsconfig.json`;
    }


    get geneseMapperFolder(): string {
        return `${GLOBAL.projectPath}/dist/genese/mapper`;
    }


    get instanceGeneratorPath(): string {
        return `${GLOBAL.nodeModulePath}/dist/instance-generator.ts`;
    }


    get isFirstMapper(): boolean {
        return this.instanceGenerators.length === 0;
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



