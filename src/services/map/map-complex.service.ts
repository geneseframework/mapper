import { CreateOptions } from '../../models/create-options.model';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { isUnion } from '../../types/target/string/union.type';
import { MainService } from '../main.service';
import { getElements, trimTarget } from '../../utils/target.util';
import { CheckTargetsService } from '../init/check-targets.service';
import * as chalk from 'chalk';
import { isLiteral, isStringAsNullOrLiteral } from '../../types/literal.type';
import { MapNullOrLiteralService } from './map-null-or-literal.service';

export class MapComplexService {

    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        console.log(chalk.yellowBright('CPXXXXX'), target, data);
        const elements: string[] = getElements(target);
        const first: string = elements[0].trim();
        const others: string = trimTarget(target.slice(first.length));
        if (isParenthesized(target)) {

        } else if (isUnion(target)) {
            if (isStringAsNullOrLiteral(first)) {
                console.log(chalk.cyanBright('IS STR AS LITTTT'), first, others, data, MapNullOrLiteralService.create(first)?.toString());
                if (first.toString() === data) {
                    return data;
                } else {
                    return (isStringAsNullOrLiteral(others) && others.toString() === data) ? data : undefined;
                }
            }
            const mapped: any = await MainService.mapToString(first, data, options);
            console.log(chalk.cyanBright('IS UNIONNNNN'), mapped);
            // TODO: implement behavior if mapped is defined but could be defined too in the other parts of the union type
            return mapped || await MainService.mapToString(others, data, options);
        } else {
            return CheckTargetsService.throwTarget(target, data, options);
        }
    }
}
