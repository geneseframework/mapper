import { isValidDateConstructor } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import { INVALID_RESPONSE } from '../../const/invalid-response.const';

export class MapDateService {


    /**
     * Returns mapped date (ie: new Date(data)) if data is a valid date constructor
     * @param data
     */
    static create(data: any): MapResponse {
        return isValidDateConstructor(data) ? new MapResponse(new Date(data)) : INVALID_RESPONSE;
    }
}
