import { Quoted } from '../../../shared/types/quoted.type';
import { isString } from '../../utils/native/strings.util';
import { isNumber } from '../../utils/native/numbers.util';
import { removeBorders } from '../../../shared/utils/strings.util';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapQuotedService {

    /**
     * Returns data if its equal or assimilated to the target which is a literal, undefined if not
     * @param target    // The target with Literal format ('a', 1, etc.)
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create<T>(target: Quoted, data: any, options: MapperBehavior): any {
        if (isString(data) || (isNumber(data) && options?.castStringsAndNumbers === false)) {
            return removeBorders(target) === data.toString() ? data.toString() : undefined;
        }
        return undefined;
    }

}
