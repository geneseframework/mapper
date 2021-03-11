import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { expect } from './test-algo.service';
import { INIT } from '../init/init.const';
import { InitService } from '../init/init.service';

INIT.debug = true;

export async function startTests(logPassed: boolean, old: boolean): Promise<void> {
    const start = Date.now();
    console.log(chalk.blueBright('START TESTS'));
    INIT.start = Date.now();
    await InitService.start();
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
