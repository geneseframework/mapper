export type Bracketed = `[${string}]`;

export function isBracketed(text: string): text is Bracketed {
    return /^\[.+\]$/g.test(text);
}
