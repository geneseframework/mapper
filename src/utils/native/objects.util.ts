import { isArray } from './arrays.util';

export function isObject(data: any): data is object {
    return typeof data === 'object';
}

export function isObjectWhichIsNotArray(data: any): data is object {
    return isObject(data) && !isArray(data);
}
