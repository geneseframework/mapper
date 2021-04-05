import { create } from '../../main';
import { isNullOrUndefined } from '../../types/trivial-types/null-or-undefined.type';
import { ArrayType, typeOfArray } from '../../types/non-trivial-types/array-type.type';
import { isWildCard } from '../../types/non-trivial-types/wildcard.type';
import { isArray, MapperConfigBehavior } from '@genese/core';

export class MapArrayService<T> {


    /**
     * Returns undefined if data is not an array, data if target is a wildcard and mapped array if not
     * @param target    // The target with array format
     * @param data      // The data to mapIfValid
     * @param options   // The create() options
     */
    static create(target: ArrayType, data: any, options: MapperConfigBehavior): any[] {
        if (!isArray(data)) {
            return undefined;
        } else if (isWildCard(typeOfArray(target))) {
            return data;
        } else {
            return this.mapArray(target, data, options);
        }
    }


    /**
     * Returns mapped array
     * @param target    // The target with array format
     * @param data      // The array to mapIfValid
     * @param options   // The create() options
     */
    private static mapArray(target: ArrayType, data: any, options: MapperConfigBehavior): any[] {
        const arr: any[] = [];
        for (const element of data) {
            arr.push(isNullOrUndefined(element) ? element : create(typeOfArray(target), element, options));
        }
        return arr;
    }
}
