import { NullOrBooleanOrNumber, NumericOrStringifiedNullOrBoolean } from '../../types/null-or-literal.type';

export class MapNullOrLiteralService {


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

