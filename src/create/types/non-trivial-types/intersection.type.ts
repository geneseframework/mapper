/**
 * Interrogation types
 */
export type Intersection =  `${string} & ${string}`;

/**
 * Checks if a text corresponds to is an intersection type
 * @param text      // The text to check
 */
export function hasIntersection(text: string): text is Intersection {
    return /.+ & .+/g.test(text);
}
