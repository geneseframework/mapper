import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { expect } from './test-algo.service';
import { INIT } from '../../init/const/init.const';
import { GLOBAL } from '../../create/const/global.const';
import { Project, SourceFile } from 'ts-morph';
import { generateInstance } from '../../dist/instance-generator';
import { declarationInfos } from '../../dist/declaration-infos';
import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';
import { MapperConfig } from '../../shared/models/config.model';
import { ConfigService } from '../../init/services/config.service';
import { initPaths, initProject } from '../tests-init.debug';

INIT.debug = true;


export async function startTests(): Promise<void> {
    const start = Date.now();
    console.log(chalk.yellowBright('START TESTS'));
    INIT.start = Date.now();
    await init();
    GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
    GLOBAL.generateInstance = generateInstance;
    const specFiles: string[] = INIT.project.addSourceFilesAtPaths('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/*.spec.ts').map(s => s.getFilePath());
    await getTests(specFiles);
    expect(TESTS.testMappers.concat(TESTS.its));
    logFailedTests();
    const duration: number = Date.now() - start;
    console.log(chalk.greenBright('\nTests passed : '), TESTS.testsPassed);
    console.log(chalk.redBright('Tests failed : '), TESTS.testsFailed);
    console.log(chalk.blueBright('Duration : '), duration, 'ms');
    clearCode();
}


async function init(): Promise<void> {
    INIT.project = new Project({skipFileDependencyResolution: true});
    initPaths();
    const mapperConfig: MapperConfig = await ConfigService.init();
    await initProject();
    ConfigService.addConfigFilesToProject(mapperConfig);
}


function clearCode(): void {
    const project = new Project();
    clearDeclarationInfos(project);
    clearGenerateInstance(project);
}


function clearDeclarationInfos(project: Project): void {
    const declarationInfosSourceFile: SourceFile = project.addSourceFileAtPath( process.cwd() + '/src/dist/declaration-infos.ts');
    declarationInfosSourceFile.replaceWithText('export var declarationInfos = [];');
    declarationInfosSourceFile.saveSync();
}


function clearGenerateInstance(project: Project): void {
    const instanceGeneratorSourceFile: SourceFile = project.addSourceFileAtPath( process.cwd() + '/src/dist/instance-generator.ts');
    const code = `export const generateInstance = function(instanceGenerator) {
    try {
        let instance;
        switch (instanceGenerator.id) {
            default:
                console.log('WARNING: No instance found for instanceGenerator id = ', instanceGenerator?.id);
                instance = undefined;
        }
        return instance;
    } catch(err) {
        console.log('Impossible to map this instance. Did you exported it ?', err);
    }
}
`
    instanceGeneratorSourceFile.replaceWithText(code);
    instanceGeneratorSourceFile.saveSync();
}


async function getTests(specFiles: string[]): Promise<void> {
    for (const specFile of specFiles) {
        const file: any = await require(specFile);
        TESTS.its.push(...file?.its);
        TESTS.testMappers.push(...file?.testMappers);
    }
}


function logFailedTests(): void {
    for (const failed of TESTS.failed) {
        console.log(chalk.redBright('Failed => '), failed);
    }
}
