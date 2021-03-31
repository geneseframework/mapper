/**
 * Texts having semi-columns
 */
export type SemiColumn = `${string}:${string}`;

/**
 * Checks if a text has semi-columns
 * @param text      // The text to check
 */
export function hasSemiColumn(text: string): text is SemiColumn {
    return /.+:.+/g.test(text);
}
