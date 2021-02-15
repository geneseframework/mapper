import { kuzzyTest } from '../test.service';
import { StringOrStrings } from '../../types/string-or-strings.type';
import * as chalk from 'chalk';
import { TESTS } from '../test';

export class PersonWithNickNames {
    nickNames: StringOrStrings;
}

async function kzTest(): Promise<any> {
    await kuzzyTest('data: string / propertyType: string | string[]', PersonWithNickNames, {nickNames: 'Auguste'}, { log: true });
    console.log(chalk.greenBright('\nTests passed : '), TESTS.testsPassed);
    console.log(chalk.redBright('Tests failed : '), TESTS.testsFailed);
}

kzTest()

