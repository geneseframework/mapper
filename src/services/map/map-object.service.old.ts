import { TargetInfo } from '../../types/target/target-info.type';
import { isArray } from '../../utils/native/arrays.util';
import { haveArrayIncompatibility } from '../../utils/incompatibility.util';
import * as chalk from 'chalk';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';

export class MapObjectServiceOld {


    static create(data: object[], info: TargetInfo): object[]
    static create(data: object, info: TargetInfo): object
    static create(data: object, info: TargetInfo): object | object[] | undefined {
        // console.log(chalk.blueBright('MAP OBJJJJJ'), data, info, haveArrayIncompatibility(data, info?.isArray));
        if (haveArrayIncompatibility(data, info?.isArray)) {
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
        return objectsArray;
    }


    private static createObject(data: object): object {
        if (data === null) {
            return null;
        }
        return isObjectWhichIsNotArray(data) ? data : undefined;
    }

}
