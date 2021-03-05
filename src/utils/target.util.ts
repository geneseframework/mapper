import { BracketedOrParenthesized, isBracketedOrParenthesized } from '../types/target/string/bracketed-or-penthesized.type';
import { isString } from './native/strings.util';
import { Bracketed } from '../types/target/string/bracketed.type';
import { isUnion } from '../types/target/string/union.type';
import { isIntersection } from '../types/target/string/intersection.type';
import { hasCommas } from '../types/target/string/commas.type';
import { isArray } from './native/arrays.util';
import { ElementAndSeparator } from '../types/target/string/element-and-separator.type';
import { Separator } from '../types/target/string/separator.type';
import { HasSeparators, hasSeparators, splitSeparator } from '../types/target/string/has-separators.type';
import { getContent, removeBorders } from '../types/target/string/containerized.type';


export function isArrayOfSameLength(text: Bracketed, data: any[]): boolean {
    return isArray(data) && data.length === bracketedLength(text);
}


export function bracketedLength(text: Bracketed): number {
    return getElements(removeBorders(text)).length;
}


export function getContainerizedElements(text: BracketedOrParenthesized): string[] {
    const insideContainer = text.slice(1, -1).trim();
    return getContent(text) ? [] : getElements(insideContainer);
}


export function getElements(text: string): string[] {
    return getElementsWithSeparator(text).map(e => e[0]);
}


export function getElementsWithSeparator(text: string): ElementAndSeparator[] {
    if (trimTarget(text).length === 0) {
        return [];
    }
    const cleanedText: string = trimTarget(text);
    if (isBracketedOrParenthesized(cleanedText)) {
        return [[cleanedText, undefined]];
    } else if (hasSeparators(cleanedText)) {
        return getElementsOfComplexText(cleanedText);
    } else {
        return [[cleanedText, undefined]]
    }
}


function getElementsOfComplexText(text: string): ElementAndSeparator[] {
    if (isUnion(text)) {
        return getSplitElements(text, '|');
    } else if (isIntersection(text)) {
        return getSplitElements(text, '&');
    } else if (hasCommas(text)) {
        return getSplitElements(text, ',');
    }
}


function getSplitElements(elements: HasSeparators, separator: Separator): ElementAndSeparator[] {
    const [first, last] = splitSeparator(elements);
    return [[first, separator], ...getElementsWithSeparator(last)];
}


export function trimTarget(text: string): string {
    const toRemoveAtTheBeginning: RegExp = /^[?, &|:]+/g;
    const toRemoveAtTheEnd: RegExp = /[?, &|:]+$/g;
    return isString(text) ? text.replace(toRemoveAtTheBeginning, '').replace(toRemoveAtTheEnd, '') : '';
}
