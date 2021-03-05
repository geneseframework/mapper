import * as chalk from 'chalk';
import { isNull, NullOrLiteral, NullOrUndefinedOrLiteral } from '../../types/literal.type';

export class MapNullOrLiteralService {


    static async create(target: string): Promise<NullOrLiteral> {
        console.log(chalk.magentaBright('NullOrLiteralllll'), target);
        if (target === 'null') {
            return null;
        } else if (target === 'true') {
            return true;
        } else if (target === 'false') {
            return false;
        } else if (!isNaN(Number(target))) {
            return Number(target);
        } else {
            return target;
        }
    }
}

