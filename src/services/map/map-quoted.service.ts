import { CreateOptions } from '../../interfaces/create-options.interface';
import * as chalk from 'chalk';
import { Quoted } from '../../types/target/string/quoted.type';
import { isString, trimOne } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';

export class MapQuotedService {


    static async create<T>(target: Quoted, data: any, options: CreateOptions): Promise<any> {
        console.log(chalk.magentaBright('QUOTTTTTT'), target, data);
        if (isString(data) || (isNumber(data) && options.differentiateStringsAndNumbers === false)) {
            return trimOne(target) === data.toString() ? data.toString() : undefined;
        }
        return undefined;
    }

}
