import { CreateOptions } from '../../interfaces/create-options.interface';
import * as chalk from 'chalk';
import { getElements, trimTarget } from '../../utils/target.util';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { isUnion } from '../../types/target/string/union.type';
import { Mapper } from '../../models/mapper';
import { MainService } from '../main.service';

export class MapComplexService {

    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        console.log(chalk.yellowBright('TYPE COMPLEXXXXX'), target, data);
        const elements: string[] = getElements(target);
        console.log(chalk.cyanBright('TYPE ELTTTTTTS'), elements);
        const first: string = elements[0].trim();
        const others: string = trimTarget(target.slice(first.length));
        if (isParenthesized(target)) {

        } else if (isUnion(target)) {
            console.log(chalk.cyanBright('UNIONNNN'), first, others);
            const mapped: any = await MainService.mapString(first, data, options);
            console.log(chalk.cyanBright('UNIONNNN mappedddddddddd'), mapped);
            return mapped ?? await this.create(others, data, options);
        }
        return undefined;
    }
}
