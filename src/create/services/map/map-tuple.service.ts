import { create } from '../../main';
import { Bracketed, isArrayOfSameLength } from '../../types/containers/bracketed.type';
import { isNullOrUndefined } from '../../types/trivial-types/null-or-undefined.type';
import { getContainerizedElements } from '../../types/containers/bracketed-or-penthesized.type';
import { MapperConfigBehavior } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';

export class MapTupleService<T> {

    /**
     * Returns mapped tuple if data is correct, undefined if not
     * @param target    // The target with tuple format
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: Bracketed, data: any, options: MapperConfigBehavior): MapResponse {
        return isArrayOfSameLength(target, data) ? this.mapTuple(target, data, options) : undefined;
    }

    /**
     * Returns mapped tuple
     * @param target    // The target with tuple format
     * @param data      // The data to map
     * @param options   // The create() options
     */
    private static mapTuple(target: Bracketed, data: any, options: MapperConfigBehavior): MapResponse {
        const tuple: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (isNullOrUndefined(data[i])) {
                tuple.push(data[i]);
            } else {
                tuple.push(create(getContainerizedElements(target)[i], data[i], options));
            }
        }
        return new MapResponse(tuple);
    }

}
