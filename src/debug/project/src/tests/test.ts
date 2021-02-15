import { expect } from './test.service';
import { testMapper } from './classes/map-class-types.test';
import * as chalk from 'chalk';
import { TESTS } from './tests.const';

async function startTests() {
    await expect(testMapper);
    console.log(chalk.greenBright('\nTests passed : '), TESTS.testsPassed);
    console.log(chalk.redBright('Tests failed : '), TESTS.testsFailed);
}

startTests();
