import { CreateOptions } from '../../models/create-options.model';
import { Quoted } from '../../types/target/string/quoted.type';
import { isString } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';
import { removeBorders } from '../../types/target/string/containerized.type';

export class MapQuotedService {


    static async create<T>(target: Quoted, data: any, options: CreateOptions): Promise<any> {
        if (isString(data) || (isNumber(data) && options.differentiateStringsAndNumbers === false)) {
            return removeBorders(target) === data.toString() ? data.toString() : undefined;
        }
        return undefined;
    }

}
