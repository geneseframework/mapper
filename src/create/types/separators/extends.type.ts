export type Extends = `${string} extends ${string}`;

/**
 * Checks if a type is a conditional type
 * @param text      // The text of the type
 */
export function hasExtends(text: string): text is Extends {
    return /\w+ extends \w+/g.test(text);
}
