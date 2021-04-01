/**
 * Checks if a value is a number
 * @param value     // The value to check
 */
export function isNumber(value: any): value is number {
    return typeof value === 'number';
}
