import * as chalk from 'chalk';
import { isNull, NullOrLiteral } from '../../types/literal.type';

export class MapNullOrLiteralService {


    static async create(target: string): Promise<NullOrLiteral> {
        console.log(chalk.magentaBright('NullOrLiteralllll'), target);
        if (isNull(target)) {
            return null;
        } else if (target === 'true') {
            return true;
        } else if (target === 'false') {
            return false;
        } else {
            return Number(target);
        }
    }
}

