import { isObject } from '@genese/core';

export class MapObjectTypeService {

    /**
     * If target is 'object' or 'Object', this method returns mapped data if data is an object or an array, undefined if not
     * @param data  // The data to mapIfValid
     */
    static create(data: object): object {
        return isObject(data) ? data : undefined;
    }

}
