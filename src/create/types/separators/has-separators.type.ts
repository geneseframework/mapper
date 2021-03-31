import { Commas } from './commas.type';
import { SemiColumn } from './semi-column.type';
import { Extends, hasExtends } from './extends.type';
import { Separator } from './separator.type';
import { Union } from '../non-trivial-types/union.type';
import { Intersection } from '../non-trivial-types/intersection.type';
import { Interrogation } from '../non-trivial-types/interrogation.type';

/**
 * Types having separators : '|', '&', ',', '?', ':', 'extends'
 */
export type HasSeparators = Union | Intersection | Commas | Interrogation | SemiColumn | Extends;

/**
 * Checks if a type has separators
 * @param text
 */
export function hasSeparators(text: string): text is HasSeparators {
    return /.+[,|&?:].+/g.test(text) || hasExtends(text);
}

/**
 * Returns a tuple containing the first element before a separator and the rest of a given text having separators
 * @param text          // The text having separators
 * @param separator     // The separator used to split the text
 */
export function splitSeparator(text: HasSeparators, separator: Separator): [first: string, others: string] {
    const split: string[] = text.split(separator);
    let first: string = split[0];
    const others: string = text.slice(first.length + separator.length);
    return [first, others];
}
