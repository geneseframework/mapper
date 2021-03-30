import { IndexableType } from '../../shared/types/indexable-type.type';
import { throwWarning } from '../utils/errors.util';

export type IndexableKey = `[${string}:${string}]: ${string}`;

export function isIndexableKey(text: string): text is IndexableKey {
    return /^\[\w+: \w+]: \w+$/.test(text.trim());
}


export function startsWithIndexableKey(text: string): text is IndexableKey {
    return /^\[\w+: \w+]: \w+/.test(text.trim());
}


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
