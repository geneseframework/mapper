import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { expect } from './test-algo.service';
import { INIT } from '../../init/const/init.const';
import { InitService } from '../../init/services/init.service';
import { GLOBAL } from '../../create/const/global.const';
import { GlobalInitService } from '../../create/services/global-init.service';
import { Project, SourceFile } from 'ts-morph';

INIT.debug = true;
GLOBAL.debug = true;

export async function startTests(logPassed: boolean, old: boolean): Promise<void> {
    const start = Date.now();
    console.log(chalk.blueBright('START TESTS'));
    INIT.start = Date.now();
    await InitService.start();
    await GlobalInitService.start();
    GLOBAL.declarationInfos = require(INIT.declarationInfoPath).declarationInfos;
    console.log(chalk.blueBright('GLOBAL DECLLLLL'), INIT.declarationInfoPath);
    console.log(chalk.blueBright('GLOBAL DECLLLLL'), GLOBAL.declarationInfos);
    console.log(chalk.blueBright('GLOBAL DECLLLLL TEXT. lgthhhh'), INIT.project.getSourceFile(INIT.declarationInfoPath)?.getFullText().length);
    // throw Error('zzzz')
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
    // clearCode();
}


function clearCode(): void {
    const project = new Project();
    const declarationInfosSourceFile: SourceFile = project.addSourceFileAtPath( process.cwd() + '/src/dist/declaration-infos.ts');
    console.log(chalk.blueBright('CODEEEEE'), declarationInfosSourceFile.getFullText()?.length);
    declarationInfosSourceFile.replaceWithText('export var declarationInfos = [];');
    declarationInfosSourceFile.saveSync();
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
