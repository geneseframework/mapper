import { create } from '../../main';
import { MapperConfig } from '../../../shared/models/config.model';
import { Bracketed } from '../../types/target/string/bracketed.type';
import { getContainerizedElements, isArrayOfSameLength } from '../../utils/target.util';
import { isNullOrUndefined } from '../../utils/native/any.util';

export class MapTupleService<T> {


    static async create(target: Bracketed, data: any, options: MapperConfig): Promise<any[]> {
        if (!isArrayOfSameLength(target, data)) {
            return undefined;
        }
        const tuple: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (isNullOrUndefined(data[i])) {
                tuple.push(data[i]);
            } else {
                tuple.push(await create(getContainerizedElements(target)[i], data[i], options));
            }
        }
        return tuple;
    }

}
