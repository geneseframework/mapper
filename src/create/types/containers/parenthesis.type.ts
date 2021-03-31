/**
 * Texts surrounded by parenthesis
 */
export type Parenthesized = `(${string})`;

/**
 * Checks if a text is surrounded by parenthesis
 * @param text      // The text to check
 */
export function isParenthesized(text: string): text is Parenthesized {
    return /^\(.*\)$/g.test(text);
}
