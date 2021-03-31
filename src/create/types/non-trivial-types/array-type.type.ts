import { hasSeparators } from '../separators/has-separators.type';

export type ArrayType = `${string}[]`;              // Type corresponding to targets without separators ending with empty brackets
export type EndsWithEmptyBrackets = ArrayType;      // Equivalent type used to to define strings ending with empty brackets

/**
 * Checks if a text has no separators and is ending by empty brackets
 * @param text  // The text to check
 */
export function isArrayType(text: string): text is ArrayType {
    return endsWithEmptyBrackets(text) && !hasSeparators(typeOfArray(text));
}

/**
 * Checks if a text is ending by empty brackets
 * @param text  // The text to check
 */
function endsWithEmptyBrackets(text: string): text is EndsWithEmptyBrackets {
    return /^\w.*\[\]$/g.test(text);
}

/**
 * Returns the string before the empty brackets
 * @param text
 */
export function typeOfArray(text: ArrayType): string {
    return text.slice(0, -2);
}
