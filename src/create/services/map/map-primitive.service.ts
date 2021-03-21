import { Primitive } from '../../types/primitives.type';
import { castStringAndNumbers } from '../../utils/native/primitives.util';
import { isString } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapPrimitiveService {


    static create(target: string, data: any, options: MapperBehavior): Primitive {
        if (data === null) {
            return null;
        }
        return this.haveSameTypeOrAreAssimilated(target, data, options) ? castStringAndNumbers(target, data) : undefined;
    }


    private static haveSameTypeOrAreAssimilated(target: string, data: any, options: MapperBehavior): boolean {
        return typeof data === target?.toLowerCase()
            || (isString(data) && target?.toLowerCase() === 'number' && options.castStringsAndNumbers === true)
            || (isNumber(data) && target?.toLowerCase() === 'string' && options.castStringsAndNumbers === true);
    }

}
