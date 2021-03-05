import { CreateOptions } from '../../models/create-options.model';
import * as chalk from 'chalk';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { isUnion } from '../../types/target/string/union.type';
import { MainService } from '../main.service';
import { getElements, trimTarget } from '../../utils/target.util';
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
            const mapped: any = await MainService.mapToString(first, data, options);
            console.log(chalk.cyanBright('UNIONNNN mappedddddddddd'), first, others, mapped);
            return mapped ?? await MainService.mapToString(others, data, options);
        } else {
            console.log(chalk.cyanBright('THROW TGTTTTT'), target, data);
            return CheckTargetsService.throwTarget(target, data, options);
        }
    }
}
