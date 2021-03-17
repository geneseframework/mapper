import { Config } from '../../../shared/models/config.model';
import { Quoted } from '../../../shared/types/quoted.type';
import { isString } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';
import { removeBorders } from '../../types/target/string/containerized.type';

export class MapQuotedService {


    static async create<T>(target: Quoted, data: any, options: Config): Promise<any> {
        if (isString(data) || (isNumber(data) && options?.behavior?.differentiateStringsAndNumbers === false)) {
            return removeBorders(target) === data.toString() ? data.toString() : undefined;
        }
        return undefined;
    }

}
