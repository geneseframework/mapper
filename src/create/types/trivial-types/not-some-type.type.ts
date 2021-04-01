import { Primitive } from './primitives.type';
import { isObject } from '../../../shared/core/utils/primitives/objects.util';
import { isArray } from '../../../shared/core/utils/primitives/arrays.util';

/**
 * Types defined by their opposite
 */
export type NotString = number | boolean | object;
export type NotNumber = string | boolean | object;
export type NotBoolean = number | string | object;
export type NotObject = number | string | boolean;
export type NotDate = NotString & NotNumber;
export type ObjectNotArray = { [k: string]: unknown };
export type NotArray = Primitive | ObjectNotArray;
export type NotInstance = Primitive | Array<any>;

/**
 * Checks if an object in javascript sense is an array or not
 * @param data      // The data to check
 */
export function isObjectWhichIsNotArray(data: any): data is ObjectNotArray {
    return isObject(data) && !isArray(data);
}
