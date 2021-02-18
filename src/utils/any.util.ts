export function keyExistsButIsNullOrUndefined(target: any, key: string): boolean {
    return target?.hasOwnProperty(key) && isNullOrUndefined(target[key]);
}


export function isNullOrUndefined(data: any): boolean {
    return data === undefined || data === null;
}
