export type CurveBracketed = `{${string}}`;

export function isCurveBracketed(text: string): text is CurveBracketed {
    return /^{.*}$/g.test(text);
}
