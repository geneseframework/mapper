import { removeBorders } from '../utils/strings.util';

export type Quoted = `'${string}'` | `"${string}"` | `\`${string}\``;

export function isQuoted(text: string): text is Quoted {
    return isSurroundedBy(text, `'`) || isSurroundedBy(text, `"`) || isSurroundedBy(text, `\``);
}


function isSurroundedBy(text: string, boundary: string): boolean {
    return text && text.slice(0, 1) === boundary && text.slice(text.length - 1) === boundary && !removeBorders(text).includes(boundary);
}

export function addQuotes(text: string): string {
    if (!text) {
        return text;
    }
    const escapedText = text.replace(/`/g, '\\`');
    return `\`${escapedText}\``;
}
