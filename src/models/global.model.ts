import { Project, SourceFile } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from './instance-generator.model';
import * as chalk from 'chalk';
import { ClassInfo } from './declarations/class-info.model';
import { isClassInfo, isEnumInfo, isInterfaceInfo, isTypeInfo } from '../utils/declaration-info.util';
import { EnumInfo } from './declarations/enum-info.model';
import { InterfaceInfo } from './declarations/interface-info.model';
import { TypeInfo } from './declarations/type-info.model';
import { DeclarationInfo } from './declarations/declaration-info.model';


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


    getEnumInfo(target: string): EnumInfo {
        return this.declarationInfos.find(d => isEnumInfo(d) && d.name === target) as EnumInfo;
    }


    getInterfaceInfo(target: string): InterfaceInfo {
        return this.declarationInfos.find(d => isInterfaceInfo(d) && d.name === target) as InterfaceInfo;
    }


    getTypeInfo(target: string): TypeInfo {
        return this.declarationInfos.find(d => isTypeInfo(d) && d.name === target) as TypeInfo;
    }


    isAlreadyDeclared(target: string): boolean {
        return !!this.declarationInfos.find(d => d.name === target);
    }


    get classNames(): string[] {
        return this.declarationInfos.filter(d => isClassInfo(d)).map(d => d.name);
    }


    get configFilePath(): string {
        return `${GLOBAL.projectPath}/tsconfig.json`;
    }


    get enumNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'EnumDeclaration').map(d => d.name);
    }


    get instanceGeneratorPath(): string {
        return `${GLOBAL.nodeModulePath}/dist/instance-generator.ts`;
    }


    get interfaceNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'InterfaceDeclaration').map(d => d.name);
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
        return this.declarationInfos.filter(d => d.kind === 'TypeAliasDeclaration').map(d => d.name);
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



