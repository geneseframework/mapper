import {
    BracketedOrParenthesized,
    isBracketedOrParenthesized
} from '../types/containers/bracketed-or-penthesized.type';
import { isString } from '../../shared/core/utils/primitives/strings.util';
import { Bracketed } from '../types/containers/bracketed.type';
import { hasCommas } from '../types/separators/commas.type';
import { ElementAndSeparator } from '../types/separators/element-and-separator.type';
import { Separator } from '../types/separators/separator.type';
import { HasSeparators, hasSeparators, splitSeparator } from '../types/separators/has-separators.type';
import { getContent } from '../types/containers/containerized.type';
import { throwWarning } from '../../shared/core/utils/functions/errors.util';
import { hasSemiColumn } from '../types/separators/semi-column.type';
import { hasExtends } from '../types/separators/extends.type';
import { removeBorders } from '../../shared/utils/strings.util';
import { isArray } from '../../shared/utils/arrays.util';
import { hasUnion } from '../types/non-trivial-types/union.type';
import { hasIntersection } from '../types/non-trivial-types/intersection.type';
import { hasInterrogation } from '../types/non-trivial-types/interrogation.type';


export function isArrayOfSameLength(text: Bracketed, data: any[]): boolean {
    return isArray(data) && data.length === bracketedLength(text);
}


export function bracketedLength(text: Bracketed): number {
    return getElements(removeBorders(text)).length;
}


export function getContainerizedElements(text: BracketedOrParenthesized): string[] {
    const insideContainer = text.slice(1, -1).trim();
    return getContent(text) ? getElements(insideContainer) : [];
}


export function getElements(text: string): string[] {
    return getElementsWithSeparator(text).map(e => e[0]);
}


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


function getSplitElements(elements: HasSeparators, separator: Separator): ElementAndSeparator[] {
    const [first, last] = splitSeparator(elements, separator);
    return [...getElementsWithSeparator(first), ...getElementsWithSeparator(last)];
}


export function trimSeparators(text: string): string {
    const toRemoveAtTheBeginning: RegExp = /^([?, &|:])+/g;
    const toRemoveAtTheEnd: RegExp = /([?, &|:])+$/g;
    return isString(text) ? text.replace(toRemoveAtTheBeginning, '').replace(toRemoveAtTheEnd, '') : '';
}

