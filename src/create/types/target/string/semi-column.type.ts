export type SemiColumn = `${string}:${string}`;

export function hasSemiColumn(text: string): text is SemiColumn {
    return /.+:.+/g.test(text);
}
