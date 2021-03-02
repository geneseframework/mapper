import { isFunction } from '../utils/native/functions.util';
import { isArray } from '../utils/native/arrays.util';

export type TConstructor<T> = new (...args: any[]) => T;

/**
 * CAUTION:
 * @param value
 */
export function isTConstructor(value: any): value is TConstructor<any> {
    return isFunction(value) && value.hasOwnProperty('prototype');
}

export function isTConstructorArray(values: any[]): values is TConstructor<any>[] {
    return isArray(values) && values.every(value => isFunction(value));
}
