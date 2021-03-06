import { Primitive } from '../../types/primitives.type';
import { CreateOptions } from '../../models/create-options.model';
import { castStringAndNumbers } from '../../utils/native/primitives.util';
import { isString } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';

export class MapPrimitiveService {


    static create(target: string, data: any, options: CreateOptions): Primitive {
        if (data === null) {
            return null;
        }
        return this.haveSameType(target, data, options) ? castStringAndNumbers(target, data) : undefined;
    }


    private static haveSameType(target: string, data: any, options: CreateOptions): boolean {
        return typeof data === target?.toLowerCase()
            || (isString(data) && target?.toLowerCase() === 'number' && options.differentiateStringsAndNumbers === false)
            || (isNumber(data) && target?.toLowerCase() === 'string' && options.differentiateStringsAndNumbers === false);
    }

}
