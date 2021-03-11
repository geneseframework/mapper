import { Mapper } from '../../models/mapper';
import { CreateOptions } from '../../models/create-options.model';
import { Bracketed } from '../../types/target/string/bracketed.type';
import { getContainerizedElements, isArrayOfSameLength } from '../../utils/target.util';
import { isNullOrUndefined } from '../../utils/native/any.util';
import * as chalk from 'chalk';

export class MapTupleService<T> {


    static async create(target: Bracketed, data: any, options: CreateOptions): Promise<any[]> {
        console.log(chalk.blueBright('MAP TUPLEEEE'), target, data);
        if (!isArrayOfSameLength(target, data)) {
            return undefined;
        }
        const tuple: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (isNullOrUndefined(data[i])) {
                tuple.push(data[i]);
            } else {
                tuple.push(await Mapper.create(getContainerizedElements(target)[i], data[i], options));
            }
        }
        return tuple;
    }

}
