export function isNullOrUndefined(value: any): value is null | undefined {
    return value === undefined || value === null;
}


export function isAny(typeName: string): boolean {
    return typeName === 'any' || typeName === undefined;
}


export function areBothTrueOrFalse(first: boolean, last: boolean): boolean {
    return (first && last) || (!first && !last);
}
