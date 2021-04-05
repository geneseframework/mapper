import { IndexableType } from '../../../shared/types/indexable-type.type';
import { throwWarning } from '@genese/core';

/**
 * Texts corresponding to an indexable property (ie like [key: string]: number)
 */
export type IndexableKey = `[${string}:${string}]: ${string}`;

/**
 * Checks if a text corresponds to an indexable key
 * @param text      // The text to check
 */
export function isIndexableKey(text: string): text is IndexableKey {
    return /^\[\w+: \w+]: \w+$/.test(text.trim());
}

/**
 * Checks if a text starts by an indexable key
 * @param text      // The text to check
 */
export function startsWithIndexableKey(text: string): text is IndexableKey {
    return /^\[\w+: \w+]: \w+/.test(text.trim());
}

/**
 * Returns the IndexableType corresponding to an indexable key
 * @param text      // The text to check
 */
export function getIndexableTypeFromIndexableKey(text: IndexableKey): IndexableType {
    const split: string[] = text.split(']: ');
    const returnType: string = split[1];
    const type: 'string' | 'number' = split[0].match(/\w+$/)[0] as 'string' | 'number';
    if (!['string', 'number'].includes(type)) {
        throwWarning(`wrong type of indexable type : ${text}`);
    }
    return {
        returnType: returnType,
        type: type
    }
}
