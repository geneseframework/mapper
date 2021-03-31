import { Project, SourceFile } from 'ts-morph';
import { INIT } from '../const/init.const';
import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';
import { InstanceGenerator } from '../../shared/models/instance-generator.model';

/**
 * The global values used during the init() process
 */
export class Init {

    debug = false;                                          // True if we are in debug mode, false if not
    declarationInfos: any[] = [];                           // The declarationsInfos which will be create during the init() process
    declarationInfoSourceFile: SourceFile = undefined;      // The sourceFile of the declaration-infos.ts file
    instanceGenerators: any[] = [];                         // The switch cases of the method which will be used in the create() process to instantiate classes
    instanceGeneratorSourceFile: SourceFile = undefined;    // The sourceFile of the instance-generator.ts file
    geneseMapperNodeModulePath: string = undefined;         // The path of the @genese/mapper node-module
    project: Project = undefined;                           // The ts-morph project defined by default or with the geneseconfig.ts file
    projectPath: string = undefined;                        // The path to the project of the user


    /**
     * Returns the names of the classes included in the declarationInfos array (in the generated file declaration-infos.js)
     */
    get classNames(): string[] {
        return this.declarationInfos.filter(d => this.isClassInfo(d)).map(d => d.name);
    }

    /**
     * The path to the tsconfig.json file by default
     */
    get defaultTsConfigPath(): string {
        return `${INIT.projectPath}/tsconfig.json`;
    }

    /**
     * The path to the generated file 'declaration-info.js'
     */
    get declarationInfoPath(): string {
        return this.debug ? `${INIT.geneseMapperNodeModulePath}/src/dist/declaration-infos.js` : `${INIT.geneseMapperNodeModulePath}/generated/declaration-infos.js`;
    }

    /**
     * The path to the generated file 'config.js'
     */
    get generatedConfigPath(): string {
        return this.debug ? `${INIT.geneseMapperNodeModulePath}/src/dist/config.js` : `${INIT.geneseMapperNodeModulePath}/generated/config.js`;
    }

    /**
     * The path to the generated file 'global-init.service.js'
     */
    get globalInitPath(): string {
        return this.debug ? `${INIT.geneseMapperNodeModulePath}/src/dist/global-init.service.js` : `${INIT.geneseMapperNodeModulePath}/dist/create/services/global-init.service.js`;
    }

    /**
     * The path to the generated file 'instance-generator.js'
     */
    get instanceGeneratorPath(): string {
        return this.debug ? `${INIT.geneseMapperNodeModulePath}/src/dist/instance-generator.js` : `${INIT.geneseMapperNodeModulePath}/generated/instance-generator.js`;
    }

    /**
     * The path to the geneseconfig.ts file
     */
    get userGeneseConfigPath(): string {
        return `${INIT.projectPath}/geneseconfig.ts`;
    }

    /**
     * Adds a declarationInfo in the array of DeclarationInfos
     * @param declarationInfo   // The object to add
     */
    addDeclarationInfo(declarationInfo: DeclarationInfo): void {
        this.declarationInfos.push(declarationInfo);
    }

    /**
     * Adds a new instance generator on the switch clauses on the generated file instance-generator.js
     * @param instanceGenerator // The InstanceGenerator to add
     */
    addInstanceGenerator(instanceGenerator: InstanceGenerator<any>): void {
        const iGenerator: any = this.instanceGenerators.find(i => i.id === instanceGenerator.id);
        if (!iGenerator) {
            this.instanceGenerators.push(instanceGenerator);
        }
    }

    /**
     * Checks if a declarationInfo already exists with the name equals to the parameter "target"
     * @param target    // The target to check
     */
    isAlreadyDeclared(target: string): boolean {
        return !!this.declarationInfos.find(d => d.name === target);
    }

    /**
     * Checks if a DeclarationInfo is a ClassInfo
     * @param declarationInfo
     */
    isClassInfo(declarationInfo: DeclarationInfo): boolean {
        return declarationInfo.kind === 'Class';
    }

}



