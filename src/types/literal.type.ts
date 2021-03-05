import { isNumber } from '../utils/native/numbers.util';
import { isBoolean } from '../utils/native/booleans.util';
import { isObjectWhichIsNotArray } from '../utils/native/objects.util';

export function isNull(value: any): value is null {
    return value === null;
}


export function isUndefined(value: any): value is undefined {
    return value === undefined;
}


export type Literal = Number | Boolean | Object;
export function isLiteral(value: any): value is Literal {
    return isNumber(value) || isBoolean(value) || isObjectWhichIsNotArray(value);
}


export type NullOrLiteral = Number | Boolean | Object | null | undefined;
export function isNullOrLiteral(value: any): value is (Literal | null | undefined) {
    return isLiteral(value) || isNull(value) || isUndefined(value);
}


export type NullOrUndefinedOrLiteral = Number | Boolean | Object | null | undefined;
export function isNullOrUndefinedOrLiteral(value: any): value is (Literal | null | undefined) {
    return isLiteral(value) || isNull(value) || isUndefined(value);
}


export function isStringAsNullOrLiteral(text: string): boolean {
    return text === 'null' || !isNaN(Number(text)) || text === 'true' || text === 'false';
}


export function isStringAsTrivialType(text: string): boolean {
    return text === 'null'
        || text === 'undefined'
        || !isNaN(Number(text))
        || text === 'true'
        || text === 'false'
        || text === 'any';
}
