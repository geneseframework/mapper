
export type QuotedInit = `'${string}'` | `"${string}"` | `\`${string}\``;
export type AntiQuoted = `\`${string}\`` | `"${string}"`;

export function isQuoted(text: string): text is QuotedInit {
    return isSurroundedBy(text, `'`) || isSurroundedBy(text, `"`) || isSurroundedBy(text, `\``);
}

export function isAntiQuoted(text: string): text is QuotedInit {
    return isSurroundedBy(text, `\``);
}


function isSurroundedBy(text: string, boundary: string): boolean {
    return text && text.slice(0, 1) === boundary && text.slice(text.length - 1) === boundary && !removeBordersInit(text).includes(boundary);
}


export function removeQuotes(text: string): string {
    return isQuoted(text) ? removeBordersInit(text) : text;
}


export function removeBordersInit(text: string): string {
    return text.slice(1, -1);
}


export function addQuotes(text: string): string {
    if (!text) {
        return text;
        // return '``';
    }
    const escapedText = text.replace(/`/g, '\\`');
    return `\`${escapedText}\``;
    // if (isQuoted(text)) {
    //     return isAntiQuoted(text) ? `\`\\\`${removeBorders(text)}\\\`\`` : `\`${text}\``;
    // } else {
    //     return
    // }
}
