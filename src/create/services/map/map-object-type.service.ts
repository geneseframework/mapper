import { isObject } from '../../../shared/core/utils/primitives/objects.util';

export class MapObjectTypeService {

    /**
     * If target is 'object' or 'Object', this method returns mapped data if data is an object or an array, undefined if not
     * @param data  // The data to map
     */
    static create(data: object): object {
        return isObject(data) ? data : undefined;
    }

}
