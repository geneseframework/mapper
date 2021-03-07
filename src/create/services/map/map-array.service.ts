import { isArray } from '../../utils/native/arrays.util';
import { isAny } from '../../utils/native/any.util';
import { CreateOptions } from '../../models/create-options.model';
import { Mapper } from '../../models/mapper';
import { ArrayType, typeOfArray } from '../../types/target/string/array-type.type';

export class MapArrayService<T> {


    static async create(target: ArrayType, data: any, options: CreateOptions): Promise<any[]> {
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
                    const mappedElement: any = await Mapper.create(typeOfArray(target), element, options);
                    arr.push(mappedElement);
                }
            }
            return arr;
        }
    }

}