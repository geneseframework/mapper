import { Mapper } from '../../create/models/mapper';
import * as chalk from 'chalk';
import { TESTS } from './tests.const';
import { isSameObject } from '../../create/utils/native/is-same-object.util';
import { isTestIt, TestType } from './test-type.type';

const MAX_DURATION = 50;


export async function expect(testTypes: TestType[]): Promise<void> {
    console.log(chalk.greenBright('EXPCCCCC'), testTypes.length);
    for (const testMapper of includedTestTypes(testTypes)) {
        console.log(chalk.blueBright('TESTMPPPPP'), testMapper.title);
        await checkTest(testMapper);
    }
}


async function checkTest(testType: TestType): Promise<void> {
    let result;
    const start = Date.now();
    if (isTestIt(testType)) {
        result = await testType.method(testType.data);
    } else {
        result = await Mapper.create(testType.mapParameter, testType.data, testType.options?.config);
    }
    const duration: number = Date.now() - start;
    if ((isExpectedResult(testType, result) && !isTooLong(duration)) || shouldFail(testType)) {
        console.log(chalk.greenBright(`Test passed (${duration} ms) : `), testType.title);
        TESTS.testsPassed++;
        if (testType.options?.log) {
            log(testType, result);
        }
    } else {
        if (isTooLong(duration)) {
            console.log(chalk.redBright(`Test failed (too long time : ${duration} ms)`), testType.title);
        } else {
            console.log(chalk.redBright('Test failed : '), testType.title);
        }
        TESTS.testsFailed++;
        TESTS.failed.push(`${testType.title} (${duration} ms)`);
        log(testType, result);
    }
}


function isTooLong(duration: number): boolean {
    return duration > MAX_DURATION;
}


function shouldFail(testType: TestType): boolean {
    return testType.options?.shouldFail;
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
