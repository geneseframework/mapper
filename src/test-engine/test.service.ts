import { Mapper } from '../models/mapper';
import { isSameObject } from '../utils/tools.service';
import * as chalk from 'chalk';
import { TestMapper } from './test-mapper.model';
import { TESTS } from './tests.const';

export async function expect(testMappers: TestMapper[]): Promise<void>
export async function expect(testMapper: TestMapper): Promise<void>
export async function expect(testMappers: TestMapper | TestMapper[]): Promise<void> {
    if (Array.isArray(testMappers)) {
        for (const testMapper of includedTestMappers(testMappers)) {
            await expectMapper(testMapper);
        }
    } else {
        await expectMapper(testMappers);
    }
}


async function expectMapper(testMapper: TestMapper): Promise<void> {
    const result = await Mapper.create(testMapper.mapParameter, testMapper.data, testMapper.options?.mapperOptions);
    // console.log(chalk.magentaBright('TEST RESULTTTTTT'), result);
    if (isExpectedResult(testMapper.data, result, testMapper.options?.shouldFail) ) {
        console.log(chalk.greenBright('Test passed : '), testMapper.title);
        TESTS.testsPassed++;
        if (testMapper.options?.log) {
           log(testMapper.data, result);
        }
    } else {
        console.log(chalk.redBright('Test failed : '), testMapper.title);
        TESTS.testsFailed++;
        log(testMapper.data, result);
    }
}


function includedTestMappers(testMappers: TestMapper[]): TestMapper[] {
    const includedMappers: TestMapper[] = testMappers.filter(t => t.options?.i === true);
    return includedMappers.length > 0 ? includedMappers : testMappers;
}


function isExpectedResult(data: any, result: any, shouldFail: boolean): boolean {
    console.log(chalk.magentaBright('TEST RESULTTTTTT'), data, result, shouldFail, isSameObject(result, data));
    if (isSameObject(result, data)) {
        console.log(chalk.magentaBright('TEST RESULTTTTTT IS SAMEEEEEEE'), data, result, shouldFail);
        return !shouldFail;
    } else {
        return shouldFail;
    }
}


function log(data: any, result: any): void {
    console.log(chalk.blueBright('data : '), data);
    console.log(chalk.blueBright('response : '), result);
}