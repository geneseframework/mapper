import { CreateOptions } from '../../models/create-options.model';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { isUnion } from '../../types/target/string/union.type';
import { MainService } from '../main.service';
import { getElements, trimTarget } from '../../utils/target.util';
import { CheckTargetsService } from '../init/check-targets.service';
import * as chalk from 'chalk';
import { isLiteral, isStringAsNullOrLiteral } from '../../types/literal.type';
import { MapNullOrLiteralService } from './map-null-or-literal.service';
import { isPrimitive, Primitive } from '../../types/primitives.type';
import { MapPrimitiveService } from './map-primitive.service';
import { isString } from '../../utils/native/strings.util';

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
                // TODO: check if the behavior is correct for strings and numbers
                // if (isPrimitive(data)) {
                //     const firstWithInitialType: Primitive = !isNaN(Number(first)) ? Number(first) : first;
                //     return MapPrimitiveService.create(firstWithInitialType, data, options);
                if (first === data?.toString()) {
                    console.log(chalk.red('????'), options.differentiateStringsAndNumbers, isString(data), data);
                    return options.differentiateStringsAndNumbers && isString(data) ? undefined : data;
                } else if (isStringAsNullOrLiteral(others)) {
                    return options.differentiateStringsAndNumbers && isString(data) ? undefined : data;
                    // return others === data?.toString() ? data : undefined;
                    // return others === data?.toString() ? data : await MainService.mapToString(others, data, options);
                    // return (isStringAsNullOrLiteral(others) && others === data?.toString()) ? data : undefined;
                } else {
                    console.log(chalk.red('TODO : IS STR AS LITTTT'), first, others, data, MapNullOrLiteralService.create(first)?.toString());
                    return await MainService.mapToString(others, data, options);
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
