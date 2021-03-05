import { CreateOptions } from '../../models/create-options.model';
import * as chalk from 'chalk';
import { Quoted } from '../../types/target/string/quoted.type';
import { isString, removeBorders } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';

export class MapQuotedService {


    static async create<T>(target: Quoted, data: any, options: CreateOptions): Promise<any> {
        // console.log(chalk.magentaBright('QUOTTTTTT'), target, data);
        if (isString(data) || (isNumber(data) && options.differentiateStringsAndNumbers === false)) {
            return removeBorders(target) === data.toString() ? data.toString() : undefined;
        }
        return undefined;
    }

}
