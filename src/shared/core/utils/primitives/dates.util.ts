
/**
 * Checks if a text is equal to 'date' or 'Date'
 * @param text     // The text to check
 */
export function isDateTypeName(text: string): boolean {
    return ['date', 'Date'].includes(text);
}

/**
 * Checks if a value is able to generate a Date object
 * @param d     // The value to check
 */
export function isValidDateConstructor(d: any): d is (string | number | Date) {
    return d && typeof d === 'string' || typeof d === 'number' || (typeof d.year === 'string' && typeof d.month === 'number') || this.isValidDate(d);
}

/**
 * Checks if a value is a valid Date object
 * @param d     // The value to check
 */
export function isValidDate(d: any): d is Date {
    return Object.prototype.toString.call(d) === "[object Date]" ? !isNaN(d.getTime()) : false;
}
