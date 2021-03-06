export type Intersection =  `${string} & ${string}`;

export function isIntersection(text: string): text is Intersection {
    return /.+ & .+/g.test(text);
}
