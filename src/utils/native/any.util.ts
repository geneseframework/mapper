export function keyExistsAndIsNullOrUndefined(obj: any, key: string): boolean {
    return obj?.hasOwnProperty(key) && isNullOrUndefined(obj[key]);
}


export function isNullOrUndefined(data: any): boolean {
    return data === undefined || data === null;
}


export function isAnyOrAnyArray(typeName: string): boolean {
    return isAny(typeName) || isAnyArray(typeName);
}


export function isAny(typeName: string): boolean {
    return typeName === 'any' || typeName === undefined;
}


export function isAnyArray(typeName: string): boolean {
    return typeName === 'any[]';
}
