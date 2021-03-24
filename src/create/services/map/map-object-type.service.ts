import { isArray } from '../../utils/native/arrays.util';
import { isObject, isObjectWhichIsNotArray } from '../../utils/native/objects.util';

export class MapObjectTypeService {


    /**
     * If target is 'object' or 'Object', this method returns mapped data if data is an object or an array
     * @param data
     */
    static create(data: object): object {
        return isObject(data) ? data : undefined;
        // return isArray(data) ? this.createArrayObjects(data as object[]) : this.createObject(data);
    }


    private static createArrayObjects(data: object[]): object[] {
        const objectsArray = [];
        for (const element of data) {
            const objectElement: object = this.createObject(element);
            if (objectElement || element === undefined || element === null) {
                objectsArray.push(objectElement);
            }
        }
        return objectsArray;
    }


    private static createObject(data: object): object {
        if (data === null) {
            return null;
        }
        return isObjectWhichIsNotArray(data) ? data : undefined;
    }

}
