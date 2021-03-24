export type NullOrUndefined = null | undefined;


export function isNullOrUndefined(value: any): value is NullOrUndefined {
    return value === undefined || value === null;
}
