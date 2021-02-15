import { MapParameter } from '../../../../types/map-parameter.type';
import { Mapper } from '../../../../models/mapper';
import { isSameObject } from '../../../../utils/tools.service';
import * as chalk from 'chalk';
import { MapperOptions } from '../../../../interfaces/mapper-options.interface';
import { TESTS } from './test';

export async function kuzzyTest(title: string, mapParameter: MapParameter<any>, data: any, options?: any): Promise<boolean> {
    console.log(chalk.blueBright('KZ TESTTTTTT'), mapParameter);
    const result = await Mapper.create(mapParameter, data);
    if (isSameObject(result, data)) {
        console.log(chalk.greenBright('Test passed : '), title);
        TESTS.testsPassed++;
        if (options?.log) {
            console.log(chalk.blueBright('data : '), data);
            console.log(chalk.blueBright('result : '), result);
        }
        return true;
    } else {
        console.log(chalk.redBright('Test failed : '), title);
        console.log(chalk.redBright('data : '), data);
        console.log(chalk.redBright('response : '), result);
        TESTS.testsFailed++;
        return false;
    }
}
