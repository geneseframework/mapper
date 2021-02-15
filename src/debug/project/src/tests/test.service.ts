import { MapParameter } from '../../../../types/map-parameter.type';
import { Mapper } from '../../../../models/mapper';
import { isSameObject } from '../../../../utils/tools.service';
import * as chalk from 'chalk';

export async function kuzzyTest(title: string, mapParameter: MapParameter<any>, data: any): Promise<boolean> {
    console.log(chalk.blueBright('KZ TESTTTTTT'), mapParameter);
    const result = await Mapper.create(mapParameter, data);
    if (isSameObject(result, data)) {
        console.log(chalk.blueBright('Test passed : '), title);
        return true;
    } else {
        console.log(chalk.redBright('Test failed : '), title);
        console.log(chalk.redBright('data : '), data);
        console.log(chalk.redBright('response : '), result);
        return false;
    }
}
