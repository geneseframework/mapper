import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { expect } from './test-algo.service';
import { INIT } from '../../init/const/init.const';
import { InitService } from '../../init/services/init.service';
import { GLOBAL } from '../../create/const/global.const';
import { GlobalInitService } from '../../create/services/global-init.service';
import { Project, SourceFile } from 'ts-morph';
import { generateInstance } from '../../dist/instance-generator';

INIT.debug = true;
GLOBAL.debug = true;

export async function startTests(logPassed: boolean, old: boolean): Promise<void> {
    const start = Date.now();
    console.log(chalk.blueBright('START TESTS'));
    INIT.start = Date.now();
    await InitService.start();
    await GlobalInitService.start();
    GLOBAL.declarationInfos = require(INIT.declarationInfoPath).declarationInfos;
    GLOBAL.generateInstance = require(INIT.instanceGeneratorPath).generateInstance;
    console.log(chalk.blueBright('GLOBAL DECLLLLL'), INIT.declarationInfoPath);
    console.log(chalk.blueBright('GLOBAL DECLLLLL'), GLOBAL.declarationInfos?.length);
    console.log(chalk.blueBright('GLOBAL DECLLLLL TEXT. lgthhhh'), INIT.project.getSourceFile(INIT.declarationInfoPath)?.getFullText().length);
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


// function clearCode(): void {
//     const project = new Project();
//     const declarationInfosSourceFile: SourceFile = project.addSourceFileAtPath( process.cwd() + '/src/dist/declaration-infos.ts');
//     console.log(chalk.blueBright('CODEEEEE'), declarationInfosSourceFile.getFullText()?.length);
//     declarationInfosSourceFile.replaceWithText('export var declarationInfos = [];');
//     declarationInfosSourceFile.saveSync();
// }

function clearCode(): void {
    const project = new Project();
    clearDeclarationInfos(project);
    clearGenerateInstance(project);
}


function clearDeclarationInfos(project: Project): void {
    const declarationInfosSourceFile: SourceFile = project.addSourceFileAtPath( process.cwd() + '/src/dist/declaration-infos.ts');
    console.log(chalk.blueBright('CODEEEEE'), declarationInfosSourceFile.getFullText()?.length);
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
//     instanceGeneratorSourceFile.saveSync();
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
