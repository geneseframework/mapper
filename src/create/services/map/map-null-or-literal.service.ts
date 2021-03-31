import { NullOrBooleanOrNumber, NumericOrStringifiedNullOrBoolean } from '../../types/null-or-literal.type';

/**
 * Service used in case of stringified target corresponding numeric strings, 'null', 'true' or 'false'
 */
export class MapNullOrLiteralService {

    /**
     * Return value corresponding to a stringified target which is a numeric string, 'null', 'true' or 'false'
     * @param target    // The stringified target
     */
    static create(target: NumericOrStringifiedNullOrBoolean): NullOrBooleanOrNumber {
        if (target === 'null') {
            return null;
        } else if (target === 'true') {
            return true;
        } else if (target === 'false') {
            return false;
        } else {
            return Number(target);
        }
    }
}

