import { CreateOptions } from '../../interfaces/create-options.interface';
import * as chalk from 'chalk';
import { getElements } from '../../utils/target.util';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { isUnion } from '../../types/target/string/union.type';

export class MapComplexService {

    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        console.log(chalk.yellowBright('TYPE COMPLEXXXXX'), target, data);
        console.log(chalk.cyanBright('TYPE ELTTTTTTS'), getElements(target));
        if (isParenthesized(target)) {

        } else if (isUnion(target)) {

        }
        return undefined;
    }
}
