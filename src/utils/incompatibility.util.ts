import { isArray } from './arrays.util';
import { isPrimitiveValue } from './primitives.util';
import * as chalk from 'chalk';


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
    return (isPrimitiveValue(first) || isPrimitiveValue(last)) && typeof first !== typeof last;
}
