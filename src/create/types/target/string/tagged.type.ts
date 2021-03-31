/**
 * Text surrounded by tags
 */
export type Tagged = `<${string}>`;

/**
 * Checks if a check is a tag
 * @param text
 */
export function isTagged(text: string): text is Tagged {
    return /^<.*>$/g.test(text);
}
