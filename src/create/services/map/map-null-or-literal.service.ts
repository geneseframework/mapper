import { NumericOrStringifiedNullOrBoolean } from '../../types/trivial-types/null-or-literal.type';
import { MapResponse } from '../../models/map-response.model';
import * as chalk from 'chalk';

/**
 * Service used in case of stringified target corresponding numeric strings, 'null', 'true' or 'false'
 */
export class MapNullOrLiteralService {

    /**
     * Return value corresponding to a stringified target which is a numeric string, 'null', 'true' or 'false'
     * @param target    // The stringified target
     */
    static create(target: NumericOrStringifiedNullOrBoolean): MapResponse {
        const mapResponse = new MapResponse();
        if (target === 'null') {
            mapResponse.response = null;
        } else if (target === 'true') {
            mapResponse.response = true;
        } else if (target === 'false') {
            mapResponse.response = false;
        } else {
            mapResponse.response = Number(target);
        }
        return mapResponse;
    }
}

