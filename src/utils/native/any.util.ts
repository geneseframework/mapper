import { isArray } from './arrays.util';

export function isNullOrUndefined(value: any): value is null | undefined {
    return value === undefined || value === null;
}


export function isAny(typeName: string): boolean {
    return typeName === 'any' || typeName === undefined;
}


export function haveSameType(...args:any[]): boolean {
    if (!isArray(args)) {
        return false;
    } else if (args.length === 1) {
        return true
    } else {
       const firstElementType: any = typeof args[0];
        return args?.every(a => typeof a === firstElementType);
    }
}


export function areBothTrueOrFalse(first: boolean, last: boolean): boolean {
    return (first && last) || (!first && !last);
}
