import { MapperConfig } from '../../../shared/models/config.model';
import { Quoted } from '../../../shared/types/quoted.type';
import { isString } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';
import { removeBorders } from '../../../shared/utils/strings.util';

export class MapQuotedService {


    static async create<T>(target: Quoted, data: any, options: MapperConfig): Promise<any> {
        if (isString(data) || (isNumber(data) && options?.behavior?.differentiateStringsAndNumbers === false)) {
            return removeBorders(target) === data.toString() ? data.toString() : undefined;
        }
        return undefined;
    }

}
