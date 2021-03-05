import { isArray } from '../../utils/native/arrays.util';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import { CreateOptions } from '../../models/create-options.model';
import * as chalk from 'chalk';

export class MapObjectService {


    static async create(target: string, data: any, options?: CreateOptions): Promise<object> {
        console.log(chalk.blueBright('MAP OBJJJJJ'), target, data);
        return undefined;
    }


    static createLiteral(data: object): object {
        if  (isArray(data)) {
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
