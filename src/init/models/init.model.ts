import { Project, SourceFile } from 'ts-morph';
import { INIT } from '../const/init.const';


export class Init {

    debug = false;
    declarationInfos: any[] = [];
    declarationInfoSourceFile: SourceFile = undefined;
    instanceGenerators: any[] = [];
    instanceGeneratorSourceFile: SourceFile = undefined;
    nodeModulePath: string = undefined;
    project: Project = undefined;
    projectPath: string = undefined;
    private _projectWithNodeModules: Project = undefined;
    start: number = undefined;


    get classNames(): string[] {
        return this.declarationInfos.filter(d => this.isClassInfo(d)).map(d => d.name);
    }


    get configFilePath(): string {
        return `${INIT.projectPath}/tsconfig.json`;
    }


    get declarationInfoPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/src/dist/declaration-infos.js` : `${INIT.nodeModulePath}/generated/declaration-infos.js`;
    }


    get globalInitPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/src/dist/global-init.service.js` : `${INIT.nodeModulePath}/dist/src/create/services/global-init.service.js`;
    }


    get instanceGeneratorPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/src/dist/instance-generator.js` : `${INIT.nodeModulePath}/generated/instance-generator.js`;
    }


    get projectWithNodeModules(): Project {
        if (!this._projectWithNodeModules) {
            this._projectWithNodeModules = new Project({ tsConfigFilePath: this.configFilePath });
        }
        return this._projectWithNodeModules;
    }


    addDeclarationInfo(declarationInfo): void {
        this.declarationInfos.push(declarationInfo);
    }


    addInstanceGenerator(instanceGenerator: any): void {
        const iGenerator: any = this.instanceGenerators.find(i => i.id === instanceGenerator.id);
        if (!iGenerator) {
            this.instanceGenerators.push(instanceGenerator);
        }
    }


    isAlreadyDeclared(target: string): boolean {
        return !!this.declarationInfos.find(d => d.name === target);
    }


    isClassInfo(declarationInfo): boolean {
        return declarationInfo.kind === 'Class';
    }

}



