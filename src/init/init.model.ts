import { Project, SourceFile } from 'ts-morph';
import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';
import { INIT } from './init.const';
import { DeclarationInfo } from '../models/declarations/declaration-info.model';


export class Init {

    debug = false;
    declarationInfos: DeclarationInfo[] = [];
    declarationInfoSourceFile: SourceFile = undefined;
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => Promise<T>
    instanceGenerators: InstanceGenerator<any>[] = [];
    instanceGeneratorSourceFile: SourceFile = undefined;
    nodeModulePath: string = undefined;
    project: Project = undefined;
    projectPath: string = undefined;
    private _projectWithNodeModules: Project = undefined;
    start: number = undefined;


    get configFilePath(): string {
        return `${INIT.projectPath}/tsconfig.json`;
    }


    get declarationInfoPath(): string {
        return `${INIT.nodeModulePath}/src/dist/declaration-info.ts`;
    }


    get instanceGeneratorPath(): string {
        return `${INIT.nodeModulePath}/src/dist/instance-generator.ts`;
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


    addDeclarationInfo(declarationInfo: DeclarationInfo): void {
        this.declarationInfos.push(declarationInfo);
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

    logDuration(message: string, color: 'blueBright' | 'yellowBright' | 'magentaBright' | 'cyanBright' | 'greenBright' = 'blueBright'): void {
        console.log(chalk[color](`${message} : TIME `), Date.now() - this.start);
    }

}



