export type Interrogation = `${string}?${string}`;

export function hasInterrogation(text: string): text is Interrogation {
    return /.+\?.+/g.test(text);
}
