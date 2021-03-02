import { isArray } from './arrays.util';
import { TConstructor } from '../../types/t-constructor.type';


export function isFunction(element: any): element is Function {
    return typeof element === 'function';
}


export function isFunctionArray(values: any[]): values is TConstructor<any>[] {
    return isArray(values) && values.every(value => isFunction(value));
}


export function isFunctionWhichIsExportedClass(value: any): value is TConstructor<any> {
    return isFunction(value) && isExportedClass(value);
}


export function isFunctionWhichIsNotExportedClass(value: any): value is TConstructor<any> {
    return isFunction(value) && !isExportedClass(value);
}

// TODO
export function isExportedClass(f: Function): f is TConstructor<any> {
    return true;
}
