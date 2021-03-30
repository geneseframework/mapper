export type Bracketed = `[${string}]`;

export function isBracketed(text: string): text is Bracketed {
    return /^\[.+]$/g.test(text);
}


export function getFirstBracketed(text: string): Bracketed {
    return text?.trim().match(/^\[.+]/)?.[0] as Bracketed;
}
