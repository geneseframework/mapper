export type Commas = `${string},${string}`;

export function hasCommas(text: string): text is Commas {
    return /,/g.test(text);
}
