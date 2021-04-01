import { removeBorders } from '../core/utils/primitives/strings.util';

/**
 * Strings surrounded by simple-quotes, double-quotes or anti-quotes
 */
export type Quoted = `'${string}'` | `"${string}"` | `\`${string}\``;

/**
 * Checks if a string is surrounded by simple-quotes, double-quotes or anti-quotes
 * @param text      // The text to check
 */
export function isQuoted(text: string): text is Quoted {
    return isSurroundedBy(text, `'`) || isSurroundedBy(text, `"`) || isSurroundedBy(text, `\``);
}

/**
 * Checks if some text is surrounded by a given boundary char
 * @param text          // The text to check
 * @param boundary      // The char which could be the boundary
 */
function isSurroundedBy(text: string, boundary: string): boolean {
    return text && text.slice(0, 1) === boundary && text.slice(text.length - 1) === boundary && !removeBorders(text).includes(boundary);
}

/**
 * Returns some text surrounded by new quotes
 * @param text      // The text to update
 */
export function addQuotes(text: string): string {
    if (!text) {
        return text;
    }
    const escapedText = text.replace(/`/g, '\\`');
    return `\`${escapedText}\``;
}

/**
 * Remove the borders of a text surrounded by quotes
 * @param text      // The text to update
 */
export function removeQuotes(text: string): string {
    return this.isQuoted(text) ? removeBorders(text) : text;
}

