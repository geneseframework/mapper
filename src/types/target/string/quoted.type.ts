import { removeBorders } from './containerized.type';

export type Quoted = `'${string}'` | `"${string}"` | `\`${string}\``;
export type AntiQuoted = `\`${string}\`` | `"${string}"`;

export function isQuoted(text: string): text is Quoted {
    return isSurroundedBy(text, `'`) || isSurroundedBy(text, `"`) || isSurroundedBy(text, `\``);
}

export function isAntiQuoted(text: string): text is Quoted {
    return isSurroundedBy(text, `\``);
}


function isSurroundedBy(text: string, boundary: string): boolean {
    return text && text.slice(0, 1) === boundary && text.slice(text.length - 1) === boundary && !removeBorders(text).includes(boundary);
}


export function removeQuotes(text: string): string {
    return isQuoted(text) ? removeBorders(text) : text;
}


export function addQuotes(text: string): string {
    if (!text) {
        return '``';
    }
    const escapedText = text.replace(/`/g, '\\`');
    return `\`${escapedText}\``;
    // if (isQuoted(text)) {
    //     return isAntiQuoted(text) ? `\`\\\`${removeBorders(text)}\\\`\`` : `\`${text}\``;
    // } else {
    //     return
    // }
}
