import { isNumber } from '../utils/native/numbers.util';
import { isBoolean } from '../utils/native/booleans.util';
import { isObjectWhichIsNotArray } from '../utils/native/objects.util';

export function isNull(value: any): value is null {
    return value === null;
}

export type Literal = Number | Boolean | Object;
export function isLiteral(value: any): value is Literal {
    return isNumber(value) || isBoolean(value) || isObjectWhichIsNotArray(value);
}

export type NullOrLiteral = Number | Boolean | Object | null;
export function isNullOrLiteral(value: any): value is Literal {
    return isLiteral(value) || isNull(value);
}


export function isStringAsNullOrLiteral(text: string): boolean {
    return isNull(text) || !isNaN(Number(text)) || text === 'true' || text === 'false';
}
