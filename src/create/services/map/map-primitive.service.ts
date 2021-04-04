import { Primitive, PrimitiveType } from '../../types/trivial-types/primitives.type';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { castStringAndNumbers, isNumber, isString } from '@genese/core';

export class MapPrimitiveService {


    /**
     * Returns the primitive value corresponding to the primitive target and the data value
     * @param target    // The target with format 'string' | 'number' | 'boolean'
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: PrimitiveType, data: any, options: MapperBehavior): Primitive {
        return this.haveSameTypeOrAreAssimilated(target, data, options) ? castStringAndNumbers(target, data) : undefined;
    }


    /**
     * Checks if data has the same type than target or has a type assimilated to the target's type (cast strings and numbers or not)
     * @param target    // The target with format 'string' | 'number' | 'boolean'
     * @param data      // The data to map
     * @param options   // The create() options
     * @private
     */
    private static haveSameTypeOrAreAssimilated(target: PrimitiveType, data: any, options: MapperBehavior): boolean {
        return typeof data === target?.toLowerCase()
            || (isString(data) && target?.toLowerCase() === 'number' && options.castStringsAndNumbers === true)
            || (isNumber(data) && target?.toLowerCase() === 'string' && options.castStringsAndNumbers === true);
    }

}
