import { Project, SourceFile } from 'ts-morph';
import { InstanceGenerator } from '../../create/models/instance-generator.model';
import * as chalk from 'chalk';
import { INIT } from '../const/init.const';
import { DeclarationInfo } from '../../create/models/declarations/declaration-info.model';
import { isClassInfo } from '../../create/utils/declaration-info.util';


export class Init {

    debug = false;
    declarationInfos: DeclarationInfo[] = [];
    declarationInfoSourceFile: SourceFile = undefined;
    instanceGenerators: InstanceGenerator<any>[] = [];
    instanceGeneratorSourceFile: SourceFile = undefined;
    nodeModulePath: string = undefined;
    project: Project = undefined;
    projectPath: string = undefined;
    private _projectWithNodeModules: Project = undefined;
    start: number = undefined;


    get classNames(): string[] {
        return this.declarationInfos.filter(d => isClassInfo(d)).map(d => d.name);
    }


    get configFilePath(): string {
        return `${INIT.projectPath}/tsconfig.json`;
    }


    get declarationInfoPath(): string {
        return `${INIT.nodeModulePath}/src/dist/declaration-infos.ts`;
    }


    get instanceGeneratorPath(): string {
        return `${INIT.nodeModulePath}/src/dist/instance-generator.ts`;
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


    isAlreadyDeclared(target: string): boolean {
        return !!this.declarationInfos.find(d => d.name === target);
    }

}



