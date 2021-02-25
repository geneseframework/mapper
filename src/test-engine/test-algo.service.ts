import { Mapper } from '../models/mapper';
import * as chalk from 'chalk';
import { TestMapper } from './test-mapper.model';
import { TESTS } from './tests.const';
import { isSameObject } from '../utils/is-same-object.util';

export async function expect(testMappers: TestMapper[], logPassed: boolean): Promise<void>
export async function expect(testMapper: TestMapper, logPassed: boolean): Promise<void>
export async function expect(testMappers: TestMapper | TestMapper[], logPassed: boolean): Promise<void> {
    if (Array.isArray(testMappers)) {
        for (const testMapper of includedTestMappers(testMappers)) {
            await expectMapper(testMapper, logPassed);
        }
    } else {
        await expectMapper(testMappers, logPassed);
    }
}


async function expectMapper(testMapper: TestMapper, logPassed: boolean): Promise<void> {
    const result = await Mapper.create(testMapper.mapParameter, testMapper.data);
    if (isExpectedResult(testMapper, result) ) {
        if (logPassed) {
            console.log(chalk.greenBright('Test passed : '), testMapper.title);
        }
        TESTS.testsPassed++;
        if (testMapper.options?.log) {
           log(testMapper, result);
        }
    } else {
        console.log(chalk.redBright('Test failed : '), testMapper.title);
        TESTS.testsFailed++;
        log(testMapper, result);
    }
}


function includedTestMappers(testMappers: TestMapper[]): TestMapper[] {
    const includedMappers: TestMapper[] = testMappers.filter(t => t.options?.isolate === true);
    return includedMappers.length > 0 ? includedMappers : testMappers;
}


function isExpectedResult(testMapper: TestMapper, result: any): boolean {
    const shouldFail: boolean = testMapper.options?.shouldFail;
    const objectToCompare: any = testMapper.options?.hasOwnProperty('expectedValue') ? testMapper.options.expectedValue : testMapper?.data;
    if (isSameObject(result, objectToCompare)) {
        return !shouldFail;
    } else {
        return shouldFail;
    }
}


function log(testMapper: TestMapper, result: any): void {
    console.log(chalk.blueBright('data : '), testMapper.data);
    console.log(chalk.blueBright('response : '), result);
    if (testMapper.options?.hasOwnProperty('expectedValue')) {
        console.log(chalk.blueBright('expected value : '), testMapper.options.expectedValue);
    }
}
