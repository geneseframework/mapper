import { isNumber } from '../utils/native/numbers.util';
import { isBoolean } from '../utils/native/booleans.util';

export type NumberOrBoolean = Number | Boolean;
export function isNumberOrBoolean(value: any): value is NumberOrBoolean {
    return isNumber(value) || isBoolean(value);
}
