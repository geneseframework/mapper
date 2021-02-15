import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { Project } from 'ts-morph';
import { expect } from './test.service';

async function startTests() {
    const project: Project = createProject();
    const specFiles: string[] = project.getSourceFiles().filter(s => isSpecFile(s.getBaseName())).map(s => s.getFilePath());
    await executeTests(specFiles);
    await expect(TESTS.its);
    console.log(chalk.greenBright('\nTests passed : '), TESTS.testsPassed);
    console.log(chalk.redBright('Tests failed : '), TESTS.testsFailed);
}


function createProject(): Project {
    return new Project({
        tsConfigFilePath: '/Users/utilisateur/Documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/tsconfig.json'
    });
}


function isSpecFile(path: string): boolean {
    return path?.slice(-8) === '.spec.ts';
}


async function executeTests(specFiles: string[]): Promise<void> {
    for (const specFile of specFiles) {
        const file: any = await require(specFile);
        TESTS.its.push(...file?.testMappers);
    }
}

startTests();
