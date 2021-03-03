export type Interrogation = `${string}?${string}`;

export function isInterrogation(text: string): text is Interrogation {
    return /.+\?.+/g.test(text);
}
