export type SemiColumn = `${string}:${string}`;

export function isUnion(text: string): text is SemiColumn {
    return /.+:.+/g.test(text);
}
