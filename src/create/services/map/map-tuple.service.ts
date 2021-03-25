import { create } from '../../main';
import { Bracketed } from '../../types/target/string/bracketed.type';
import { getContainerizedElements, isArrayOfSameLength } from '../../utils/target.util';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { isNullOrUndefined } from '../../types/null-or-undefined.type';

export class MapTupleService<T> {


    /**
     * Returns mapped tuple if data is correct, undefined if not
     * @param target    // The target with tuple format
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: Bracketed, data: any, options: MapperBehavior): any[] {
        return isArrayOfSameLength(target, data) ? this.mapTuple(target, data, options) : undefined;
    }


    /**
     * Returns mapped tuple
     * @param target    // The target with tuple format
     * @param data      // The data to map
     * @param options   // The create() options
     */
    private static mapTuple(target: Bracketed, data: any, options: MapperBehavior) {
        const tuple: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (isNullOrUndefined(data[i])) {
                tuple.push(data[i]);
            } else {
                tuple.push(create(getContainerizedElements(target)[i], data[i], options));
            }
        }
        return tuple;
    }

}
