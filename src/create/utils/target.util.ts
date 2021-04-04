import { isBracketedOrParenthesized } from '../types/containers/bracketed-or-penthesized.type';
import { hasCommas } from '../types/separators/commas.type';
import { ElementAndSeparator } from '../types/separators/element-and-separator.type';
import { Separator } from '../types/separators/separator.type';
import { HasSeparators, hasSeparators, splitSeparator } from '../types/separators/has-separators.type';
import { hasSemiColumn } from '../types/separators/semi-column.type';
import { hasExtends } from '../types/separators/extends.type';
import { hasUnion } from '../types/non-trivial-types/union.type';
import { hasIntersection } from '../types/non-trivial-types/intersection.type';
import { hasInterrogation } from '../types/non-trivial-types/interrogation.type';
import { isString, throwWarning } from '@genese/core';


/**
 * Returns the elements between the different separators of a given text
 * @param text      // The text to analyze
 */
export function getElements(text: string): string[] {
    return getElementsWithSeparator(text).map(e => e[0]);
}

/**
 * Returns the array of tuples corresponding to the elements and their corresponding separator of a given text
 * @param text      // The text to analyze
 */
function getElementsWithSeparator(text: string): ElementAndSeparator[] {
    if (trimSeparators(text).length === 0) {
        return [];
    }
    const cleanedText: string = trimSeparators(text);
    if (isBracketedOrParenthesized(cleanedText)) {
        return [[cleanedText, undefined]];
    } else if (hasSeparators(cleanedText)) {
        return getElementsOfComplexType(cleanedText);
    } else {
        return [[cleanedText, undefined]]
    }
}

/**
 * Returns the array of tuples corresponding to the elements and their corresponding separator of a complex type
 * @param text      // The text to analyze
 */
function getElementsOfComplexType(text: string): ElementAndSeparator[] {
    if (hasUnion(text)) {
        return getSplitElements(text, '|');
    } else if (hasIntersection(text)) {
        return getSplitElements(text, '&');
    } else if (hasCommas(text)) {
        return getSplitElements(text, ',');
    } else if (hasInterrogation(text)) {
        return getSplitElements(text, '?');
    } else if (hasSemiColumn(text)) {
        return getSplitElements(text, ':');
    } else if (hasExtends(text)) {
        return getSplitElements(text, 'extends');
    } else {
        throwWarning(`impossible to parse the target "${text}"`);
        return [];
    }
}

/**
 * Returns the array of tuples corresponding to the elements and their corresponding separator of a text having separators, split by a given separator
 * @param elements      // Some text having separators
 * @param separator     // The separator to split with
 */
function getSplitElements(elements: HasSeparators, separator: Separator): ElementAndSeparator[] {
    const [first, last] = splitSeparator(elements, separator);
    return [...getElementsWithSeparator(first), ...getElementsWithSeparator(last)];
}

/**
 * Returns text without separators at its extremities
 * @param text
 */
export function trimSeparators(text: string): string {
    const toRemoveAtTheBeginning: RegExp = /^([?, &|:])+/g;
    const toRemoveAtTheEnd: RegExp = /([?, &|:])+$/g;
    return isString(text) ? text.replace(toRemoveAtTheBeginning, '').replace(toRemoveAtTheEnd, '') : '';
}

