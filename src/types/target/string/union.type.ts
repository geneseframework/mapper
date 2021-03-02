export type Union = `${string} | ${string}`;


export function isUnion(text: string): text is Union {
    return /.+ \| .+/g.test(text);
}


export function splitUnion(text: Union): [first: string, others: string] {
    const split: string[] = text.split(' | ');
    const first: string = split[0];
    const others: string = text.slice(first.length + 3);
    return [first, others];
}
