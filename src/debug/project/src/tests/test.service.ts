import { Mapper } from '../../../../models/mapper';
import { isSameObject } from '../../../../utils/tools.service';
import * as chalk from 'chalk';
import { TestMapper } from './test-mapper.model';
import { TESTS } from './tests.const';

export async function expect(testMappers: TestMapper[]): Promise<void>
export async function expect(testMapper: TestMapper): Promise<void>
export async function expect(testMappers: TestMapper | TestMapper[]): Promise<void> {
    if (Array.isArray(testMappers)) {
        for (const testMapper of testMappers) {
            await expectMapper(testMapper);
        }
    } else {
        await expectMapper(testMappers);
    }
}


async function expectMapper(testMapper: TestMapper): Promise<void> {
    const result = await Mapper.create(testMapper.mapParameter, testMapper.data);
    if (isSameObject(result, testMapper.data)) {
        console.log(chalk.greenBright('Test passed : '), testMapper.title);
        TESTS.testsPassed++;
        if (testMapper.options?.log) {
            console.log(chalk.blueBright('data : '), testMapper.data);
            console.log(chalk.blueBright('result : '), result);
        }
    } else {
        console.log(chalk.redBright('Test failed : '), testMapper.title);
        console.log(chalk.redBright('data : '), testMapper.data);
        console.log(chalk.redBright('response : '), result);
        TESTS.testsFailed++;
    }
}
