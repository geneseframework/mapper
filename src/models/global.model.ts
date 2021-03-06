import { Project, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from './instance-generator.model';
import * as chalk from 'chalk';


export class Global {

    debug = false;
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => Promise<T>
    instanceGenerators: InstanceGenerator<any>[] = [];
    instanceGeneratorSourceFile: SourceFile = undefined;
    isAlreadyInitialized: boolean = false;
    nodeModulePath: string = undefined;
    project: Project = undefined;
    projectPath: string = undefined;
    private _projectWithNodeModules: Project = undefined;
    start: number = undefined;


    get configFilePath(): string {
        return `${GLOBAL.projectPath}/tsconfig.json`;
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

    logDuration(message: string): void {
        console.log(chalk.blueBright(`${message} : TIME `), Date.now() - this.start);
    }

}



