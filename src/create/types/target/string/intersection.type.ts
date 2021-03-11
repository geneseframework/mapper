export type Intersection =  `${string} & ${string}`;

export function hasIntersection(text: string): text is Intersection {
    return /.+ & .+/g.test(text);
}
