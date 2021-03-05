import * as chalk from 'chalk';

export function keyExistsAndIsNullOrUndefined(obj: any, key: string): boolean {
    return obj?.hasOwnProperty(key) && isNullOrUndefined(obj[key]);
}


export function isNullOrUndefined(value: any): value is null | undefined {
    // console.log(chalk.redBright('NULLL OR UNDDDDDD'), value);
    return value === undefined || value === null;
}


export function isAnyOrAnyArray(typeName: string): boolean {
    return isAny(typeName) || isAnyArray(typeName) || typeName === 'undefined';
}


export function isAny(typeName: string): boolean {
    return typeName === 'any' || typeName === undefined;
}


export function isAnyArray(typeName: string): boolean {
    return typeName === 'any[]';
}
