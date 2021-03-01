import { Mapper } from '../models/mapper';
import * as chalk from 'chalk';
import { TestMapper } from './test-mapper.model';
import { TESTS } from './tests.const';
import { isSameObject } from '../utils/is-same-object.util';
import { isTestIt, TestType } from './test-type.type';
import { isArray } from '../utils/arrays.util';

export async function expect(testTypes: TestType[], logPassed: boolean, old: boolean): Promise<void>
export async function expect(testType: TestType, logPassed: boolean, old: boolean): Promise<void>
export async function expect(testTypes: TestType | TestType[], logPassed: boolean, old: boolean): Promise<void> {
    if (isArray(testTypes)) {
        console.log(chalk.redBright('hereeeee'));
        for (const testMapper of includedTestTypes(testTypes)) {
            await checkTest(testMapper, logPassed, old);
        }
    } else {
        await checkTest(testTypes, logPassed, old);
    }
}


async function checkTest(testType: TestType, logPassed: boolean, old: boolean): Promise<void> {
    let result;
    if (isTestIt(testType)) {
        result = testType.method(testType.data);
    } else {
        if (old) {
            result = await Mapper.createOld(testType.mapParameter, testType.data, testType.options?.createOptions);
        } else {
            result = await Mapper.create(testType.mapParameter, testType.data, testType.options?.createOptions);
        }
    }
    if (isExpectedResult(testType, result) ) {
        if (logPassed) {
            console.log(chalk.greenBright('Test passed : '), testType.title);
        }
        TESTS.testsPassed++;
        if (testType.options?.log) {
           log(testType, result);
        }
    } else {
        console.log(chalk.redBright('Test failed : '), testType.title);
        TESTS.testsFailed++;
        TESTS.failed.push(testType.title);
        log(testType, result);
    }
}


function includedTestTypes(testTypes: TestType[]): TestType[] {
    const includedMappers: TestType[] = testTypes.filter(t => t.options?.isolate === true);
    console.log(chalk.yellowBright('INCLUDEDDDDD'), includedMappers);
    return includedMappers.length > 0 ? includedMappers : testTypes;
}


function isExpectedResult(testType: TestType, result: any): boolean {
    const objectToCompare: any = isTestIt(testType) ? testType.expected : testType.options.expectedValue;
    return isSameObject(result, objectToCompare);
}


function log(testType: TestType, result: any): void {
    console.log(chalk.blueBright('data : '), testType.data);
    console.log(chalk.blueBright('response : '), result);
    if (testType.options?.hasOwnProperty('expectedValue')) {
        console.log(chalk.blueBright('expected value : '), testType.options.expectedValue);
    }
}
