import { CreateOptions } from '../../models/create-options.model';
import * as chalk from 'chalk';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { isUnion } from '../../types/target/string/union.type';
import { Mapper } from '../../models/mapper';
import { MainService } from '../main.service';
import { getElements, trimTarget } from '../../utils/target.util';
import { ThrowOption } from '../../enums/throw-option.enum';
import { throwError, throwWarning } from '../../utils/errors.util';
import { CheckTargetsService } from '../init/check-targets.service';

export class MapComplexService {

    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        console.log(chalk.yellowBright('TYPE COMPLEXXXXX'), target, data, options);
        const elements: string[] = getElements(target);
        console.log(chalk.cyanBright('TYPE ELTTTTTTS'), elements);
        const first: string = elements[0].trim();
        const others: string = trimTarget(target.slice(first.length));
        if (isParenthesized(target)) {

        } else if (isUnion(target)) {
            const mapped: any = await MainService.mapString(first, data, options);
            console.log(chalk.cyanBright('UNIONNNN mappedddddddddd'), first, others, mapped);
            return mapped ?? await MainService.mapString(others, data, options);
        } else {
            return CheckTargetsService.throwTarget(target, data, options);
        }
    }
}
