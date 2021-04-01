/**
 * Checks if a value is a string
 * @param value     // The value to check
 */
export function isString(value: any): value is string {
    return typeof value === 'string';
}
