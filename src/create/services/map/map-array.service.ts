import { isArray } from '../../utils/native/arrays.util';
import { create } from '../../main';
import { ArrayType, typeOfArray } from '../../types/target/string/array-type.type';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { isWildCard } from '../../types/target/string/wildcard.type';
import { isNullOrUndefined } from '../../types/null-or-undefined.type';

export class MapArrayService<T> {


    /**
     * Returns undefined if data is not an array, data if target is a wildcard and mapped array if not
     * @param target    // The target with array format
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: ArrayType, data: any, options: MapperBehavior): any[] {
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
     * @param data      // The array to map
     * @param options   // The create() options
     */
    private static mapArray(target: ArrayType, data: any, options: MapperBehavior): any[] {
        const arr: any[] = [];
        for (const element of data) {
            arr.push(isNullOrUndefined(element) ? element : create(typeOfArray(target), element, options));
        }
        return arr;
    }
}
