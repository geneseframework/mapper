import { isArray } from './native/arrays.util';
import * as chalk from 'chalk';
import { isNonNullOrPrimitiveValue } from './native/primitives.util';


export function haveArrayIncompatibility(first: any, lastIsArray: boolean): boolean
export function haveArrayIncompatibility(first: any, last: any): boolean
export function haveArrayIncompatibility(first: any, last: any): boolean {
    if (typeof last === 'boolean') {
        return isArray(first) !== last;
    }
    return isArray(first) !== isArray(last);
}


export function haveIncompatibleTypes(first: any, last: any): boolean {
    console.log(chalk.magentaBright('INCOMPATBILE TYPES ????'), first, last);
    return primitiveIncompatibility(first, last);
}


export function primitiveIncompatibility(first: any, last: any): boolean {
    return (isNonNullOrPrimitiveValue(first) || isNonNullOrPrimitiveValue(last)) && typeof first !== typeof last;
}
