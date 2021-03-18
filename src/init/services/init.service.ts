import { Project } from 'ts-morph';
import { InstanceGeneratorService } from './instance-generator.service';
import { DeclarationInfoService } from './declaration-info.service';
import { INIT } from '../const/init.const';
import { RefactoGlobalInitService } from './refacto-global-init.service';
import { ConfigService } from './config.service';
import * as chalk from 'chalk';
import { MapperConfig } from '../../shared/models/config.model';

const appRoot = require('app-root-path');

export class InitService {

    /**
     * Starts the initialization and the creation of the Instance Generator file
     */
    static async start(): Promise<void> {
        INIT.project = new Project({skipFileDependencyResolution: true});
        this.initPaths();
        const mapperConfig: MapperConfig = await ConfigService.init();
        this.initProject();
        ConfigService.addConfigIncludedFiles(mapperConfig);
        console.log(chalk.blueBright('FILESSSS'), INIT.project.getSourceFiles().map(s => s.getBaseName()).filter(n => n.slice(0, 1) === 'o'));
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
        INIT.nodeModulePath = `${INIT.projectPath}/node_modules/@genese/mapper`;
    }


    /**
     * Creates the Project object
     * @private
     */
    private static initProject(): void {
        INIT.project = new Project({
            tsConfigFilePath: INIT.configFilePath,
            skipFileDependencyResolution: true
        });
        INIT.nodeModulePath = `${INIT.projectPath}/node_modules/@genese/mapper`;
    }
}
