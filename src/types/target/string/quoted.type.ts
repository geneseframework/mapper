export type Quoted = `'${string}'` | `"${string}"`;

export function isQuoted(text: string): text is Quoted {
    return /'.*'/.test(text) || /".*"/.test(text);
}
