import { Containerized, content, isContainerized } from '../types/target/string/containerized.type';
import { isString } from './native/strings.util';
import { Bracketed } from '../types/target/string/bracketed.type';
import { isUnion, splitUnion } from '../types/target/string/union.type';
import { isIntersection, splitIntersection } from '../types/target/string/intersection.type';
import { hasCommas, splitCommas } from '../types/target/string/commas.type';
import { isArray } from './native/arrays.util';


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
    if (trim(text).length === 0) {
        return [];
    }
    const elements: string = trim(text);
    if (isContainerized(elements)) {
        return [elements];
    } else if (isUnion(elements)) {
        const [first, last] = splitUnion(elements);
        return [first, ...getElements(last)];
    } else if (isIntersection(elements)) {
        const [first, last] = splitIntersection(elements);
        return [first, ...getElements(last)];
    } else if (hasCommas(elements)) {
        const [first, last] = splitCommas(elements);
        return [first, ...getElements(last)];
    } else {
        return [elements]
    }
}


function trim(text: string): string {
    return isString(text) ? text.replace(/^(,| )/g, '').replace(/(,| )$/g, '') : '';
}
