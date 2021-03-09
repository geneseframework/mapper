import { CreateOptions } from '../../models/create-options.model';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { hasUnion } from '../../types/target/string/union.type';
import { MainService } from '../main.service';
import { getElements, trimTarget } from '../../utils/target.util';
import { CheckTargetsService } from '../init/check-targets.service';
import { isStringAsNullOrLiteral } from '../../types/null-or-literal.type';
import { isString } from '../../utils/native/strings.util';
import { throwTarget } from '../../utils/errors.util';
import * as chalk from 'chalk';

export class MapComplexService {

    static async create(target: string, data: any, options: CreateOptions): Promise<any> {
        // console.log(chalk.yellowBright('MAP CPXXXXXX'), target, data);
        const elements: string[] = getElements(target);
        const first: string = elements[0].trim();
        const others: string = trimTarget(target.slice(first.length));
        if (isParenthesized(target)) {

        } else if (hasUnion(target)) {
            if (isStringAsNullOrLiteral(first)) {
                if (first === data?.toString()) {
                    return options.differentiateStringsAndNumbers && isString(data) ? undefined : data;
                } else if (isStringAsNullOrLiteral(others)) {
                    return options.differentiateStringsAndNumbers && isString(data) ? undefined : data;
                } else {
                    return await MainService.mapToString(others, data, options);
                }
            }
            const mapped: any = await MainService.mapToString(first, data, options);
            // TODO: implement behavior if mapped is defined but could be defined too in the other parts of the union type
            return mapped || await MainService.mapToString(others, data, options);
        } else {
            return throwTarget(target, data, options);
        }
    }
}
