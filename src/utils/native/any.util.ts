export function keyExistsButIsNullOrUndefined(target: any, key: string): boolean {
    return target?.hasOwnProperty(key) && isNullOrUndefined(target[key]);
}


export function isNullOrUndefined(data: any): boolean {
    return data === undefined || data === null;
}


export function isAnyOrAnyArray(typeName: string): boolean {
    return isAny(typeName) || isAnyArray(typeName);
}


export function isAny(typeName: string): boolean {
    return typeName === 'any';
}


export function isAnyArray(typeName: string): boolean {
    return typeName === 'any[]';
}


export function isFunction(element: any): element is Function {
    return typeof element === 'function';
}
