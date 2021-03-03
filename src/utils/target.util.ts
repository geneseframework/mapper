import { Containerized, content, isContainerized } from '../types/target/string/containerized.type';
import { isString } from './native/strings.util';
import { Bracketed } from '../types/target/string/bracketed.type';
import { isUnion } from '../types/target/string/union.type';
import { isIntersection } from '../types/target/string/intersection.type';
import { hasCommas } from '../types/target/string/commas.type';
import { isArray } from './native/arrays.util';
import { ElementAndSeparator } from '../types/target/string/element-and-separator.type';
import { Separator } from '../types/target/string/separator.type';
import { HasSeparators, hasSeparators, splitSeparator } from '../types/target/string/has-separators.type';


export function isArrayOfSameLength(text: Bracketed, data: any[]): boolean {
    return isArray(data) && data.length === bracketedLength(text);
}


export function bracketedLength(text: Bracketed): number {
    return getElements(content(text)).length;
}


export function getContainerizedElements(text: Containerized): string[] {
    const insideContainer = text.slice(1, -1).trim();
    return insideContainer.length === 0 ? [] : getElements(insideContainer);
}


export function getElements(text: string): string[] {
    return getElementsWithSeparator(text).map(e => e[0]);
}


export function getElementsWithSeparator(text: string): ElementAndSeparator[] {
    if (trim(text).length === 0) {
        return [];
    }
    const cleanedText: string = trim(text);
    if (isContainerized(cleanedText)) {
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


// export function getElements(text: string): string[] {
//     if (trim(text).length === 0) {
//         return [];
//     }
//     const elements: string = trim(text);
//     if (isContainerized(elements)) {
//         return [elements];
//     } else if (isUnion(elements)) {
//         const [first, last] = splitUnion(elements);
//         return [first, ...getElements(last)];
//     } else if (isIntersection(elements)) {
//         const [first, last] = splitIntersection(elements);
//         return [first, ...getElements(last)];
//     } else if (hasCommas(elements)) {
//         const [first, last] = splitCommas(elements);
//         return [first, ...getElements(last)];
//     } else {
//         return [elements]
//     }
// }


function trim(text: string): string {
    return isString(text) ? text.replace(/^(,| )/g, '').replace(/(,| )$/g, '') : '';
}
