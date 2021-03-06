export type Parenthesized = `(${string})`;

export function isParenthesized(text: string): text is Parenthesized {
    return /^\(.*\)$/g.test(text);
}
