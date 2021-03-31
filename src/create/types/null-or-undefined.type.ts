/**
 * Null or undefined values
 */
export type NullOrUndefined = null | undefined;

/**
 * Checks if some value is null or undefined
 * @param value     // The value to check
 */
export function isNullOrUndefined(value: any): value is NullOrUndefined {
    return value === undefined || value === null;
}
