/**
 * Texts surrounded by brackets
 */
export type Bracketed = `[${string}]`;

/**
 * Checks if a text is surrounded by brackets
 * @param text
 */
export function isBracketed(text: string): text is Bracketed {
    return /^\[.+]$/g.test(text);
}

/**
 * Checks if a text starts with a left bracket
 * @param text
 */
export function getFirstBracketed(text: string): Bracketed {
    return text?.trim().match(/^\[.+]/)?.[0] as Bracketed;
}
