import { getElements } from '../../utils/target.util';
import { isArray, removeBorders } from '@genese/core';

/**
 * Texts surrounded by brackets
 */
export type Bracketed = `[${string}]`;

/**
 * Checks if a text is surrounded by brackets
 * @param text
 */
export function isBracketed(text: string): text is Bracketed {
    return /^\[.+]$/g.test(text);
}

/**
 * Checks if a text starts with a left bracket
 * @param text
 */
export function getFirstBracketed(text: string): Bracketed {
    return text?.trim().match(/^\[.+]/)?.[0] as Bracketed;
}

/**
 * Checks if the number of elements of a bracketed text is equal to the length of parameter 'data'
 * @param text      // The bracketed text
 * @param data      // The data to compare
 */
export function isArrayOfSameLength(text: Bracketed, data: any[]): boolean {
    return isArray(data) && data.length === bracketedLength(text);
}

/**
 * Returns the number of elements of a bracketed text
 * @param text      // The bracketed text
 */
export function bracketedLength(text: Bracketed): number {
    return getElements(removeBorders(text)).length;
}
