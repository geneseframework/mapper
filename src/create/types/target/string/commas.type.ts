/**
 * Texts having commas
 */
export type Commas = `${string},${string}`;

/**
 * Checks if a text has commas
 * @param text
 */
export function hasCommas(text: string): text is Commas {
    return /,/g.test(text);
}

/**
 * Checks if a char is a comma
 * @param char
 */
export function isComma(char: string): char is ',' {
    return char === ',';
}
