import {
    BracketedOrParenthesized,
    isBracketedOrParenthesized
} from '../types/target/string/bracketed-or-penthesized.type';
import { isString } from './native/strings.util';
import { Bracketed } from '../types/target/string/bracketed.type';
import { hasUnion } from '../types/target/string/union.type';
import { hasIntersection } from '../types/target/string/intersection.type';
import { hasCommas } from '../types/target/string/commas.type';
import { isArray } from './native/arrays.util';
import { ElementAndSeparator } from '../types/target/string/element-and-separator.type';
import { Separator } from '../types/target/string/separator.type';
import { HasSeparators, hasSeparators, splitSeparator } from '../types/target/string/has-separators.type';
import { getContent, removeBorders } from '../types/target/string/containerized.type';
import * as chalk from 'chalk';
import { throwWarning } from './errors.util';
import { hasInterrogation } from '../types/target/string/interrogation.type';
import { hasSemiColumn } from '../types/target/string/semi-column.type';
import { hasExtends } from '../types/target/string/extends.type';


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
    // console.log(chalk.blueBright('GET ELTTTS'), text);
    return getElementsWithSeparator(text).map(e => e[0]);
}


function getElementsWithSeparator(text: string): ElementAndSeparator[] {
    if (trimTarget(text).length === 0) {
        return [];
    }
    const cleanedText: string = trimTarget(text);
    // console.log(chalk.cyanBright('CLEANEDDDDD'), cleanedText);
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


export function trimTarget(text: string): string {
    const toRemoveAtTheBeginning: RegExp = /^([?, &|:])+/g;
    const toRemoveAtTheEnd: RegExp = /([?, &|:])+$/g;
    // const toRemoveAtTheBeginning: RegExp = /^([?, &|:] | extends)+/g;
    // const toRemoveAtTheEnd: RegExp = /([?, &|:] | extends)+$/g;
    return isString(text) ? text.replace(toRemoveAtTheBeginning, '').replace(toRemoveAtTheEnd, '') : '';
}
