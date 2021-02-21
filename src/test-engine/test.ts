import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { expect } from './test.service';
import { GLOBAL } from '../const/global.const';
import { InitService } from '../services/init.service';

GLOBAL.debug = true;

async function startTests() {
    InitService.start();
    // createProject();
    console.log(chalk.blueBright('\nGLOBAL.configFilePathhhhh : '), GLOBAL.configFilePath);
    const specFiles: string[] = GLOBAL.project.getSourceFiles().filter(s => isSpecFile(s.getBaseName())).map(s => s.getFilePath());
    await getTests(specFiles);
    await expect(TESTS.its);
    console.log(chalk.greenBright('\nTests passed : '), TESTS.testsPassed);
    console.log(chalk.redBright('Tests failed : '), TESTS.testsFailed);
}


function isSpecFile(path: string): boolean {
    return path?.slice(-8) === '.spec.ts';
}


async function getTests(specFiles: string[]): Promise<void> {
    for (const specFile of specFiles) {
        const file: any = await require(specFile);
        TESTS.its.push(...file?.testMappers);
    }
}

startTests();
