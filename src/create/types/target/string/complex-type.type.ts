import { hasSeparators, HasSeparators } from './has-separators.type';
import { Generic, isGeneric } from './generics.type';

export type ComplexType = HasSeparators | Generic;

export function isComplexType(text: string): text is ComplexType {
    return hasSeparators(text) || isGeneric(text);
}
