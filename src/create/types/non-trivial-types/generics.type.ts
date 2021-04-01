import { hasSeparators } from '../separators/has-separators.type';
import { getLastContainer, HasRightBorder } from '../containers/borders.type';
import { removeBorders } from '../../../shared/core/utils/primitives/strings.util';

/**
 * Texts ending by <...> (used to define generic types, ie: without separators)
 */
export type Generic = `${string}<${string}>`;
/**
 * Texts ending by <...>
 */
export type EndsWithTag = Generic;

/**
 * Checks if a text corresponds to a generic type
 * @param text
 */
export function isGeneric(text: string): text is Generic {
    return endsWithTag(text) && !hasSeparators(typeOfGeneric(text));
}

/**
 * Check if the end of a text is a tag
 * @param text
 */
function endsWithTag(text: string): text is EndsWithTag {
    return /^\w.*<\w.*>$/g.test(text);
}

/**
 * Returns the type before the <...>
 * @param text
 */
export function typeOfGeneric(text: Generic): string {
    return text.slice(0, -tagOfGeneric(text).length -2);
}

/**
 * Returns the content of the <...>
 * @param text
 */
export function tagOfGeneric(text: Generic): string {
    return removeBorders(getLastContainer(text as unknown as HasRightBorder));
}
