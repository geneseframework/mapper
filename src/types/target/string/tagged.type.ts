export type Tagged = `<${string}>`;

export function isTagged(text: string): text is Tagged {
    return /^<.*>$/g.test(text);
}
