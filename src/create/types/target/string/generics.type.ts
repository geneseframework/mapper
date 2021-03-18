import { hasSeparators } from './has-separators.type';
import { getLastContainer, HasRightBorder } from './borders.type';
import { removeBorders } from '../../../../shared/utils/strings.util';

export type Generic = `${string}<${string}>`;
export type EndsWithTag = Generic;


export function hasGeneric(text: string): text is Generic {
    return endsWithTag(text) && !hasSeparators(typeOfGeneric(text));
}


function endsWithTag(text: string): text is EndsWithTag {
    return /^\w.*<\w.*>$/g.test(text);
}


export function typeOfGeneric(text: Generic): string {
    return text.slice(0, -tagOfGeneric(text).length -2);
}


export function tagOfGeneric(text: Generic): string {
    return removeBorders(getLastContainer(text as unknown as HasRightBorder));
}
