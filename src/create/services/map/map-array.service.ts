import { create } from '../../main';
import { isNullOrUndefined } from '../../types/trivial-types/null-or-undefined.type';
import { ArrayType, typeOfArray } from '../../types/non-trivial-types/array-type.type';
import { isWildCard } from '../../types/non-trivial-types/wildcard.type';
import { isArray, MapperConfigBehavior } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import { INVALID_RESPONSE } from '../../const/invalid-response.const';
import { MainService } from '../main.service';
import * as chalk from 'chalk';

export class MapArrayService<T> {


    /**
     * Returns undefined if data is not an array, data if target is a wildcard and mapped array if not
     * @param target    // The target with array format
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: ArrayType, data: any, options: MapperConfigBehavior): MapResponse {
        if (!isArray(data)) {
            return INVALID_RESPONSE;
        } else if (isWildCard(typeOfArray(target))) {
            return new MapResponse(data);
        } else {
            return this.mapArray(target, data, options);
        }
    }


    /**
     * Returns mapped array
     * @param target    // The target with array format
     * @param data      // The array to map
     * @param options   // The create() options
     */
    private static mapArray(target: ArrayType, data: any, options: MapperConfigBehavior): MapResponse {
        const arr: any[] = [];
        for (const element of data) {
            arr.push(isNullOrUndefined(element) ? element : MainService.mapStringTarget(typeOfArray(target), element, options).response);
        }
        return new MapResponse(arr);
    }
}
