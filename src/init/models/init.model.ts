import { Project, SourceFile } from 'ts-morph';
import { INIT } from '../const/init.const';
import * as chalk from 'chalk';


export class Init {

    // appRoot: string = undefined;
    geneseConfigPath: string = undefined;
    tsConfigPath: string = undefined;
    debug = false;
    declarationInfos: any[] = [];
    declarationInfoSourceFile: SourceFile = undefined;
    geneseConfig: object = undefined;
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


    // get tsConfigPath(): string {
    //     const path = `${this.projectPath}/geneseconfig.ts`;
    //     console.log(chalk.greenBright('PATH CONFIGGGG'), path);
    //     const geneseConfig = require(path)?.geneseConfig;
    //     console.log(chalk.magentaBright('GENESE CONFIGGGG'), geneseConfig);
    //     const zzz = geneseConfig?.creator?.tsConfigPath || `${INIT.projectPath}/tsconfig.json`;
    //     console.log(chalk.cyanBright('CONFIG PATHHHHH'), zzz);
    //     return zzz;
    // }


    get declarationInfoPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/generated/declaration-infos.js` : `${INIT.nodeModulePath}/dist/generated/declaration-infos.js`;
    }


    get instanceGeneratorPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/generated/instance-generator.js` : `${INIT.nodeModulePath}/dist/generated/instance-generator.js`;
    }


    get projectWithNodeModules(): Project {
        if (!this._projectWithNodeModules) {
            this._projectWithNodeModules = new Project({ tsConfigFilePath: this.tsConfigPath });
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



