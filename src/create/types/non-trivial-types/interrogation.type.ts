/**
 * Interrogation types
 */
export type Interrogation = `${string}?${string}`;

/**
 * Checks if a text corresponds to is a conditional type
 * @param text      // The text to check
 */
export function hasInterrogation(text: string): text is Interrogation {
    return /.+\?.+/g.test(text);
}
