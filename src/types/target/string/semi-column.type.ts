export type SemiColumn = `${string}:${string}`;

export function isSemiColumn(text: string): text is SemiColumn {
    return /.+:.+/g.test(text);
}
