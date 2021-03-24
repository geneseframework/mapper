import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { hasUnion } from '../../types/target/string/union.type';
import { MainService } from '../main.service';
import { getElements, trimSeparators } from '../../utils/target.util';
import { isStringAsNullOrLiteralOrNumeric } from '../../types/null-or-literal.type';
import { isString } from '../../utils/native/strings.util';
import { throwWarning } from '../../utils/errors.util';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapComplexService {

    static create(target: string, data: any, options: MapperBehavior): any {
        const elements: string[] = getElements(target);
        const first: string = elements[0].trim();
        const others: string = trimSeparators(target.slice(first.length));
        if (isParenthesized(target)) {

        } else if (hasUnion(target)) {
            if (isStringAsNullOrLiteralOrNumeric(first)) {
                if (first === data?.toString()) {
                    return !options.castStringsAndNumbers && isString(data) ? undefined : data;
                } else if (isStringAsNullOrLiteralOrNumeric(others)) {
                    return !options.castStringsAndNumbers && isString(data) ? undefined : data;
                } else {
                    return MainService.mapStringTarget(others, data, options);
                }
            }
            const mapped: any = MainService.mapStringTarget(first, data, options);
            // TODO: implement behavior if mapped is defined but could be defined too in the other parts of the union type
            return mapped || MainService.mapStringTarget(others, data, options);
        } else {
            throwWarning(`unknown target "${target}". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response.`)
            // return throwTarget(target, data, options);
        }
    }
}
