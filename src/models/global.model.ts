import { Project, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from './instance-generator.model';
import * as chalk from 'chalk';
import { DeclarationInfo } from './declarations/declaration-info.model';
import { ClassInfo } from './declarations/class-info.model';
import { isClassInfo } from '../utils/declaration-info.util';


export class Global {

    debug = false;
    declarationInfos: DeclarationInfo[] = [];
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => Promise<T>
    instanceGenerators: InstanceGenerator<any>[] = [];
    instanceGeneratorSourceFile: SourceFile = undefined;
    isAlreadyInitialized: boolean = false;
    nodeModulePath: string = undefined;
    project: Project = undefined;
    projectPath: string = undefined;
    private _projectWithNodeModules: Project = undefined;
    start: number = undefined;


    addDeclarationInfo(declarationInfo: DeclarationInfo): void {
        this.declarationInfos.push(declarationInfo);
    }


    getClassInfo(target: string): ClassInfo {
        return this.declarationInfos.find(d => isClassInfo(d) && d.name === target) as ClassInfo;
    }


    get classNames(): string[] {
        return this.declarationInfos.filter(d => isClassInfo(d)).map(d => d.name);
    }


    get configFilePath(): string {
        return `${GLOBAL.projectPath}/tsconfig.json`;
    }


    get enumNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'Enum').map(d => d.name);
    }


    get instanceGeneratorPath(): string {
        return `${GLOBAL.nodeModulePath}/dist/instance-generator.ts`;
    }


    get interfaceNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'Interface').map(d => d.name);
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


    get typeNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'TypeAlias').map(d => d.name);
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



