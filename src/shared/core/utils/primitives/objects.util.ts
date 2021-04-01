/**
 * Checks if a value is an object
 * @param value     // The value to check
 */
export function isObject(value: any): value is object {
    return typeof value === 'object';
}

/**
 * Checks if a text is equal to 'object' or 'Object'
 * @param text     // The text to check
 */
export function isObjectType(text: string): text is 'object' | 'Object' {
    return ['object', 'Object'].includes(text);
}
