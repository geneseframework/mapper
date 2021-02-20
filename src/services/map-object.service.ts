import { MapTargetInfo } from '../types/map-target-info.type';
import { isArray } from '../utils/arrays.util';

export class MapObjectService {


    static create(data: object[], info: MapTargetInfo): object[]
    static create(data: object, info: MapTargetInfo): object
    static create(data: object, info: MapTargetInfo): object | object[] | undefined {
        if (!this.targetAndDataAreBothArrayOrNot(data, info)) {
            return undefined;
        } else if (isArray(data)) {
            return this.createArrayObjects(data as object[]);
        } else {
            return this.createObject(data);
        }
    }


    private static createArrayObjects(data: object[]): object[] {
        const objectsArray = [];
        for (const element of data) {
            const objectElement: object = this.createObject(element);
            if (objectElement || element === undefined || element === null) {
                objectsArray.push(objectElement);
            }
        }
        return objectsArray.length > 0 ? objectsArray : undefined;
    }


    private static createObject(data: object): object {
        if (data === null) {
            return null;
        }
        return typeof data === 'object' ? data : undefined;
    }


    private static targetAndDataAreBothArrayOrNot(data: any, info: MapTargetInfo): boolean {
        return (isArray(data) && info.isArray) || (!isArray(data) && !info.isArray);
    }

}
