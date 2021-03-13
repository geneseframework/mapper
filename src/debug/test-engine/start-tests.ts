import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { expect } from './test-algo.service';
import { INIT } from '../../init/const/init.const';
import { GLOBAL } from '../../create/const/global.const';
import { Project, SourceFile } from 'ts-morph';
import { generateInstance } from '../../dist/instance-generator';
import { DeclarationInfo } from '../../create/models/declarations/declaration-info.model';
import { declarationInfos } from '../../dist/declaration-infos';
import { InitService } from '../../init/services/init.service';

INIT.debug = true;
GLOBAL.debug = true;

export async function startTests(logPassed: boolean, old: boolean): Promise<void> {
    const start = Date.now();
    console.log(chalk.blueBright('START TESTS'));
    INIT.start = Date.now();
    await InitService.start();
    GLOBAL.declarationInfos = declarationInfos as DeclarationInfo[];
    GLOBAL.generateInstance = generateInstance;
    const specFiles: string[] = INIT.project.getSourceFiles().filter(s => isSpecFile(s.getBaseName())).map(s => s.getFilePath());
    await getTests(specFiles);
    await expect(TESTS.testMappers.concat(TESTS.its), logPassed, old);
    if (!logPassed) {
        logFailedTests();
    }
    const duration: number = Date.now() - start;
    console.log(chalk.greenBright('\nTests passed : '), TESTS.testsPassed);
    console.log(chalk.redBright('Tests failed : '), TESTS.testsFailed);
    console.log(chalk.blueBright('Duration : '), duration, 'ms');
    clearCode();
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
    console.log(chalk.blueBright('CODEEEEE'), instanceGeneratorSourceFile.getFullText()?.length);
    const code = `export const generateInstance = async function(instanceGenerator) {
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


function isSpecFile(path: string): boolean {
    return path?.slice(-8) === '.spec.ts';
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
        console.log(chalk.redBright('=> '), failed);
    }
}
