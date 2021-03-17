import { MapperConfig } from '../../../shared/models/config.model';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { hasUnion } from '../../types/target/string/union.type';
import { MainService } from '../main.service';
import { getElements, trimTarget } from '../../utils/target.util';
import { isStringAsNullOrLiteral } from '../../types/null-or-literal.type';
import { isString } from '../../utils/native/strings.util';
import { throwWarning } from '../../utils/errors.util';

export class MapComplexService {

    static async create(target: string, data: any, options: MapperConfig): Promise<any> {
        const elements: string[] = getElements(target);
        const first: string = elements[0].trim();
        const others: string = trimTarget(target.slice(first.length));
        if (isParenthesized(target)) {

        } else if (hasUnion(target)) {
            if (isStringAsNullOrLiteral(first)) {
                if (first === data?.toString()) {
                    return options.behavior.differentiateStringsAndNumbers && isString(data) ? undefined : data;
                } else if (isStringAsNullOrLiteral(others)) {
                    return options.behavior.differentiateStringsAndNumbers && isString(data) ? undefined : data;
                } else {
                    return await MainService.mapToString(others, data, options);
                }
            }
            const mapped: any = await MainService.mapToString(first, data, options);
            // TODO: implement behavior if mapped is defined but could be defined too in the other parts of the union type
            return mapped || await MainService.mapToString(others, data, options);
        } else {
            throwWarning(`unknown target "${target}". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response.`)
            // return throwTarget(target, data, options);
        }
    }
}
