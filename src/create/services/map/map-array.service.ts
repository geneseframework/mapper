import { isArray } from '../../utils/native/arrays.util';
import { isAny } from '../../utils/native/any.util';
import { create } from '../../main';
import { ArrayType, typeOfArray } from '../../types/target/string/array-type.type';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapArrayService<T> {


    static create(target: ArrayType, data: any, options: MapperBehavior): any[] {
        if (!isArray(data)) {
            return undefined;
        } else if (isAny(typeOfArray(target))) {
            return data;
        } else {
            const arr: any[] = [];
            for (const element of data) {
                if (element === null || element === undefined) {
                    arr.push(element);
                } else {
                    const mappedElement: any = create(typeOfArray(target), element, options);
                    arr.push(mappedElement);
                }
            }
            return arr;
        }
    }

}
