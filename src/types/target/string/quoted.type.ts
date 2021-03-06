import { removeBorders } from './containerized.type';

export type Quoted = `'${string}'` | `"${string}"`;

export function isQuoted(text: string): text is Quoted {
    return isSurroundedBy(text, `'`) || isSurroundedBy(text, `"`);
}

function isSurroundedBy(text: string, boundary: string): boolean {
    return text[0] === boundary && text[text.length - 1] === boundary && !removeBorders(text).includes(boundary);
}
