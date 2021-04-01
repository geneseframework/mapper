/**
 * Alias of string, used to clarify to the user that a string is a numeric string (ie: '1', '23', ...)
 */
export type Numeric = string;

/**
 * Checks if a string is a numeric string (ie: '1', '23', ...)
 * @param text
 */
export function isNumeric(text: string): text is Numeric {
    return !isNaN(Number(text));
}
