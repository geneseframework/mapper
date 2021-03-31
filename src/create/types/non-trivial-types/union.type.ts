/**
 * Texts having pipes
 */
export type Union = `${string}|${string}`;

/**
 * Checks if a type is an union type
 * @param text
 */
export function hasUnion(text: string): text is Union {
    return /.+\|.+/g.test(text);
}
