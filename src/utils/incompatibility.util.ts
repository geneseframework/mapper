import { isArray } from './arrays.util';
import { isPrimitiveValue } from './primitives.util';
import { Target } from '../types/target.type';
import * as chalk from 'chalk';


export function arrayIncompatibility(first: any, last: any): boolean {
    return (isArray(first) && last) || (!isArray(first) && !last);
}


export function haveIncompatibleTypes(first: any, last: any): boolean {
    console.log(chalk.magentaBright('INCOMPATBILE TYPES ????'), first, last);
    return primitiveIncompatibility(first, last);
}


export function primitiveIncompatibility(first: any, last: any): boolean {
    return (isPrimitiveValue(first) || isPrimitiveValue(last)) && typeof first !== typeof last;
}
