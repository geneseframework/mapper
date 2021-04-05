import { PrimitiveType } from '../../types/trivial-types/primitives.type';
import { castStringAndNumbers, isNumber, isString, MapperConfigBehavior } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import { INVALID_RESPONSE } from '../../const/invalid-response.const';
import * as chalk from 'chalk';

export class MapPrimitiveService {


    /**
     * Returns the primitive value corresponding to the primitive target and the data value
     * @param target    // The target with format 'string' | 'number' | 'boolean'
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: PrimitiveType, data: any, options: MapperConfigBehavior): MapResponse {
        console.log(chalk.yellowBright('CREATE PRIMMMM'), target, data, this.haveSameTypeOrAreAssimilated(target, data, options));
        const zzz = this.haveSameTypeOrAreAssimilated(target, data, options) ? new MapResponse(castStringAndNumbers(target, data)) : INVALID_RESPONSE;
        console.log(chalk.yellowBright('CREATE PRIMMMM zzz'), zzz);
        return zzz
    }


    /**
     * Checks if data has the same type than target or has a type assimilated to the target's type (cast strings and numbers or not)
     * @param target    // The target with format 'string' | 'number' | 'boolean'
     * @param data      // The data to map
     * @param options   // The create() options
     * @private
     */
    private static haveSameTypeOrAreAssimilated(target: PrimitiveType, data: any, options: MapperConfigBehavior): boolean {
        return typeof data === target?.toLowerCase()
            || (isString(data) && target?.toLowerCase() === 'number' && options.castStringsAndNumbers === true)
            || (isNumber(data) && target?.toLowerCase() === 'string' && options.castStringsAndNumbers === true);
    }

}
