import { Mapper } from '../models/mapper';
import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { isSameObject } from '../utils/native/is-same-object.util';
import { isTestIt, TestType } from './test-type.type';
import { isArray } from '../utils/native/arrays.util';

const MAX_DURATION = 500;

export async function expect(testTypes: TestType[], logPassed: boolean, old: boolean): Promise<void>
export async function expect(testType: TestType, logPassed: boolean, old: boolean): Promise<void>
export async function expect(testTypes: TestType | TestType[], logPassed: boolean, old: boolean): Promise<void> {
    if (isArray(testTypes)) {
        for (const testMapper of includedTestTypes(testTypes)) {
            await checkTest(testMapper, logPassed, old);
        }
    } else {
        await checkTest(testTypes, logPassed, old);
    }
}


async function checkTest(testType: TestType, logPassed: boolean, old: boolean): Promise<void> {
    let result;
    const start = Date.now();
    if (isTestIt(testType)) {
        result = await testType.method(testType.data);
    } else {
        result = await Mapper.create(testType.mapParameter, testType.data, testType.options?.createOptions);
    }
    const duration: number = Date.now() - start;
    if (isExpectedResult(testType, result) && !isTooLong(duration)) {
        if (logPassed) {
            console.log(chalk.greenBright('Test passed : '), testType.title);
        }
        TESTS.testsPassed++;
        if (testType.options?.log) {
            log(testType, result);
        }
    } else {
        console.log(chalk.redBright('Test failed : '), testType.title);
        if (isTooLong(duration)) {
            console.log(chalk.redBright(`Too long time (${duration} ms)`), testType.title);
        }
        TESTS.testsFailed++;
        TESTS.failed.push(`${testType.title} (${duration} ms)`);
        log(testType, result);
    }
}


function isTooLong(duration: number): boolean {
    return duration > MAX_DURATION;
}


function includedTestTypes(testTypes: TestType[]): TestType[] {
    const includedMappers: TestType[] = testTypes.filter(t => t.options?.isolate === true);
    return includedMappers.length > 0 ? includedMappers : testTypes;
}


function isExpectedResult(testType: TestType, result: any): boolean {
    const objectToCompare: any = isTestIt(testType) ? testType.expected : testType.options?.hasOwnProperty('expectedValue') ? testType.options.expectedValue : testType.data;
    return isSameObject(result, objectToCompare);
}


function log(testType: TestType, result: any): void {
    if (isTestIt(testType)) {
        console.log(chalk.blueBright('expected : '), testType.expected);
    } else {
        console.log(chalk.blueBright('data : '), testType.data);
    }
    console.log(chalk.blueBright('response : '), result);
    if (testType.options?.hasOwnProperty('expectedValue')) {
        console.log(chalk.blueBright('expected value : '), testType.options.expectedValue);
    }
}
