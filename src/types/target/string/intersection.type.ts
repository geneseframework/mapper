export type Intersection =  `${string} & ${string}`;

export function isIntersection(text: string): text is Intersection {
    return /.+ & .+/g.test(text);
}


export function splitIntersection(text: Intersection): [first: string, others: string] {
    const split: string[] = text.split(' & ');
    const first: string = split[0];
    const others: string = text.slice(first.length + 3);
    return [first, others];
}

