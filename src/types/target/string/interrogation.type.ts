export type Interrogation = `${string}?${string}`;

export function isUnion(text: string): text is Interrogation {
    return /.+\?.+/g.test(text);
}
