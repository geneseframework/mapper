import { Quoted } from '../../../shared/types/quoted.type';
import { isNumber, isString, MapperConfigBehavior, removeBorders } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import { INVALID_RESPONSE } from '../../const/invalid-response.const';

export class MapQuotedService {

    /**
     * Returns data if its equal or assimilated to the target which is a literal, undefined if not
     * @param target    // The target with Literal format ('a', 1, etc.)
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create<T>(target: Quoted, data: any, options: MapperConfigBehavior): MapResponse {
        if (isString(data) || (isNumber(data) && options?.castStringsAndNumbers === false)) {
            return removeBorders(target) === data.toString() ? new MapResponse(data.toString()) : INVALID_RESPONSE;
        }
        return INVALID_RESPONSE;
    }

}
