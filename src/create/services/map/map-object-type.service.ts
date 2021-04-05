import { isObject } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import { INVALID_RESPONSE } from '../../const/invalid-response.const';

export class MapObjectTypeService {

    /**
     * If target is 'object' or 'Object', this method returns mapped data if data is an object or an array, undefined if not
     * @param data  // The data to map
     */
    static create(data: object): MapResponse {
        return isObject(data) ? new MapResponse(data) : INVALID_RESPONSE;
    }

}
