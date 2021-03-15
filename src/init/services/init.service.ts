import { ImportDeclaration, Project, SourceFile } from 'ts-morph';
import { InstanceGeneratorService } from './instance-generator.service';
import { DeclarationInfoService } from './declaration-info.service';
import { INIT } from '../const/init.const';
import * as chalk from 'chalk';
import { throwError } from '../utils/errors.util';
import * as fs from 'fs';
import { removeExtension } from '../../create/utils/file-system.util';

const appRoot = require('app-root-path');

export class InitService {

    /**
     * Starts the initialization and the creation of the Instance Generator file
     */
    static async start(): Promise<void> {
        await this.init();
        await DeclarationInfoService.init();
        await InstanceGeneratorService.start();
    }


    /**
     * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
     * @private
     */
    private static async init(): Promise<void> {
        await this.setGeneseConfig();
        this.createProject();
        await this.modifyGeneseConfigImport();
        INIT.nodeModulePath = INIT.debug ? process.cwd() : `${INIT.projectPath}/node_modules/@genese/creator`;
    }


    private static async setGeneseConfig(): Promise<void> {
        try {
            INIT.geneseConfigPath = INIT.debug ? `${process.cwd()}/geneseconfig.ts` : '../../../../../../../geneseconfig.ts';
            const geneseConfig: object = await this.getGeneseConfig();
            if (!geneseConfig) {
                throwError(' the file geneseconfig.ts is mandatory and must be at the root of your project.\nPlease refer to the documentation https://www.npmjs.com/package/genese/creator');
            } else {
                INIT.geneseConfig = geneseConfig;
            }
        } catch (err) {
            const message = 'Error: a file geneseconfig.ts must be at the root of your project.\nPlease refer to the documentation https://www.npmjs.com/package/genese/creator';
            throw Error(message);
        }
    }


    private static async getGeneseConfig(): Promise<object> {
        return fs.existsSync(INIT.geneseConfigPath) ? await require(INIT.geneseConfigPath)?.geneseConfig : undefined;
    }


    private static async modifyGeneseConfigImport(): Promise<void> {
        const path = INIT.debug ? `${process.cwd()}/src/create/models/global.model.ts` : `${appRoot}/node_modules/@genese/creator/dist/src/create/models/global.model.ts`;
        console.log(chalk.magentaBright('MODIFY GCONFIGGGG import '), INIT.debug, path);
        // if (!INIT.debug) {
        const globalSourceFile: SourceFile = INIT.project.addSourceFileAtPath(path);
        const importDeclaration: ImportDeclaration = globalSourceFile.getImportDeclarations().find(i => i.getNamedImports().map(n => n.getName()).includes('geneseConfig'));
        console.log(chalk.magentaBright('GLOBAL PATHHH importDeclaration?.getStructure'), importDeclaration?.getStructure());
        console.log(chalk.magentaBright('GLOBAL PATHHH INIT.geneseConfigPath'), INIT.geneseConfigPath);
        console.log(chalk.magentaBright('GLOBAL PATHHH INIT.geneseConfigPath'), removeExtension(INIT.geneseConfigPath));
        importDeclaration.setModuleSpecifier(removeExtension(INIT.geneseConfigPath));
        globalSourceFile.saveSync();
        // }
    }


    /**
     * Creates the Project object
     * @private
     */
    private static createProject(): void {
        INIT.projectPath = '../../../../../../../';
        INIT.project = new Project({
            tsConfigFilePath: INIT.tsConfigPath,
            skipFileDependencyResolution: true
        });
    }
}
