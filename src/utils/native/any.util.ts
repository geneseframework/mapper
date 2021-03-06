
export function isNullOrUndefined(value: any): value is null | undefined {
    return value === undefined || value === null;
}


export function isAny(typeName: string): boolean {
    return typeName === 'any' || typeName === undefined;
}
