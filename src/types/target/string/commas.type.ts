export type Commas = `${string},${string}`;

export function hasCommas(text: string): text is Commas {
    return /,/g.test(text);
}


export function splitCommas(text: Commas): [first: string, others: string] {
    const split: string[] = text.split(',');
    const first: string = split[0];
    const others: string = text.slice(first.length + 1);
    return [first, others];
}
