import { Quoted } from '../../../shared/types/quoted.type';
import { isString } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';
import { removeBorders } from '../../../shared/utils/strings.util';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapQuotedService {


    static create<T>(target: Quoted, data: any, options: MapperBehavior): any {
        if (isString(data) || (isNumber(data) && options?.castStringsAndNumbers === false)) {
            return removeBorders(target) === data.toString() ? data.toString() : undefined;
        }
        return undefined;
    }

}
