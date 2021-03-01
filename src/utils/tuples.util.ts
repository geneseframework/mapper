import { StringString } from '../types/tuples/string-string.type';
import { AnyAny } from '../types/tuples/any-any.type';

export function isTupleStringString(targetData: [string, any]): targetData is StringString {
    return targetData[0] === 'string' && typeof targetData[1] === 'string';
}

export function target(tuple: StringString): 'string'
export function target(tuple: AnyAny): any {
    return tuple[0];
}

export function data(tuple: StringString): string
export function data(tuple: AnyAny): any {
    return tuple[1];
}
