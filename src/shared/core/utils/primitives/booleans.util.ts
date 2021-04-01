/**
 * Checks if a value is a boolean
 * @param value     // The value to check
 */
export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}
