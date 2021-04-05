import { Project } from 'ts-morph';
import { InstanceGeneratorService } from './instance-generator.service';
import { DeclarationInfoService } from './declaration-info.service';
import { INIT } from '../const/init.const';
import { RefactoGlobalInitService } from './refacto-global-init.service';
import { ConfigService } from './config.service';
import { MapperConfig } from '@genese/core';

const appRoot = require('app-root-path');

/**
 * Process launched before the execution of the project's code which will generate the mandatory files of the create() method which will be used at runtime.
 */
export class InitService {

    /**
     * Generates the mandatory files of the create() method :
     * - config.js
     * - declaration-infos.js
     * - instance-generator.js
     * - global-init.service.js (refacto of the original file)
     */
    static async start(): Promise<void> {
        INIT.project = new Project({skipFileDependencyResolution: true});
        this.initPaths();
        const mapperConfig: MapperConfig = await ConfigService.init();
        this.initProject();
        ConfigService.addConfigFilesToProject(mapperConfig);
        await DeclarationInfoService.init();
        await InstanceGeneratorService.init();
        if (!INIT.debug) {
            await RefactoGlobalInitService.init();
        }
    }


    /**
     * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
     * @private
     */
    private static initPaths(): void {
        INIT.projectPath = appRoot;
        INIT.geneseMapperNodeModulePath = `${INIT.projectPath}/node_modules/@genese/mapper`;
    }


    /**
     * Creates the Project object
     * @private
     */
    private static initProject(): void {
        INIT.project = new Project({skipFileDependencyResolution: true});
        INIT.geneseMapperNodeModulePath = `${INIT.projectPath}/node_modules/@genese/mapper`;
    }
}
