export type Bracketed = `[${string}]`;

export function isBracketed(text: string): text is Bracketed {
    return /^\[.*\]$/g.test(text);
}


export function removeBrackets<T>(text: Bracketed): string {
    return text.slice(0, -2);
}
