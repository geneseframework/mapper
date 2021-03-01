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
        for (const testMapper of includedTestTypes(testTypes)) {
            await checkTest(testMapper, logPassed, old);
        }
    } else {
        await checkTest(testTypes, logPassed, old);
    }
}


async function checkTest(testMapper: TestType, logPassed: boolean, old: boolean): Promise<void> {
    let result;
    if (isTestIt(testMapper)) {
        result = testMapper.response;
    } else {
        if (old) {
            result = await Mapper.createOld(testMapper.mapParameter, testMapper.data, testMapper.options?.createOptions);
        } else {
            result = await Mapper.create(testMapper.mapParameter, testMapper.data, testMapper.options?.createOptions);
        }
    }
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
        TESTS.failed.push(testMapper.title);
        log(testMapper, result);
    }
}


function includedTestTypes(testTypes: TestType[]): TestType[] {
    const includedMappers: TestType[] = testTypes.filter(t => t.options?.isolate === true);
    return includedMappers.length > 0 ? includedMappers : testTypes;
}


function isExpectedResult(testType: TestType, result: any): boolean {
    const objectToCompare: any = testType.options?.hasOwnProperty('expectedValue') ? testType.options.expectedValue : testType?.data;
    return isSameObject(result, objectToCompare);
}


function log(testType: TestType, result: any): void {
    console.log(chalk.blueBright('data : '), testType.data);
    console.log(chalk.blueBright('response : '), result);
    if (testType.options?.hasOwnProperty('expectedValue')) {
        console.log(chalk.blueBright('expected value : '), testType.options.expectedValue);
    }
}
