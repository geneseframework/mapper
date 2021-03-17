import { Primitive } from '../../types/primitives.type';
import { MapperConfig } from '../../../shared/models/config.model';
import { castStringAndNumbers } from '../../utils/native/primitives.util';
import { isString } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';

export class MapPrimitiveService {


    static create(target: string, data: any, options: MapperConfig): Primitive {
        if (data === null) {
            return null;
        }
        return this.haveSameType(target, data, options) ? castStringAndNumbers(target, data) : undefined;
    }


    private static haveSameType(target: string, data: any, options: MapperConfig): boolean {
        return typeof data === target?.toLowerCase()
            || (isString(data) && target?.toLowerCase() === 'number' && options.behavior.differentiateStringsAndNumbers === false)
            || (isNumber(data) && target?.toLowerCase() === 'string' && options.behavior.differentiateStringsAndNumbers === false);
    }

}
