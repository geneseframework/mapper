import { Project, SourceFile } from 'ts-morph';
import { INIT } from '../const/init.const';

/**
 * The global values used during the init() process
 */
export class Init {

    debug = false;                                          // True if we are in debug mode, false if not
    declarationInfos: any[] = [];                           // The declarationsInfos which will be create during the init() process
    declarationInfoSourceFile: SourceFile = undefined;      // The sourceFile of the declaration-infos.ts file
    instanceGenerators: any[] = [];                         // The switch cases of the method which will be used in the create() process to instantiate classes
    instanceGeneratorSourceFile: SourceFile = undefined;    // The sourceFile of the instance-generator.ts file
    nodeModulePath: string = undefined;
    project: Project = undefined;
    projectPath: string = undefined;
    start: number = undefined;


    get classNames(): string[] {
        return this.declarationInfos.filter(d => this.isClassInfo(d)).map(d => d.name);
    }


    get defaultTsConfigPath(): string {
        return `${INIT.projectPath}/tsconfig.json`;
    }


    get declarationInfoPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/src/dist/declaration-infos.js` : `${INIT.nodeModulePath}/generated/declaration-infos.js`;
    }


    get generatedConfigPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/src/dist/config.js` : `${INIT.nodeModulePath}/generated/config.js`;
    }


    get globalInitPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/src/dist/global-init.service.js` : `${INIT.nodeModulePath}/dist/create/services/global-init.service.js`;
    }


    get instanceGeneratorPath(): string {
        return this.debug ? `${INIT.nodeModulePath}/src/dist/instance-generator.js` : `${INIT.nodeModulePath}/generated/instance-generator.js`;
    }


    get userGeneseConfigPath(): string {
        return `${INIT.projectPath}/geneseconfig.ts`;
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



