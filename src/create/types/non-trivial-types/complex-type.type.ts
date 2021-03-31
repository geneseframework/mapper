import { hasSeparators, HasSeparators } from '../separators/has-separators.type';
import { Generic, isGeneric } from './generics.type';

/**
 * Types having separators or generic types
 */
export type ComplexType = HasSeparators | Generic;

/**
 * Checks if a type has separators or is a generic type
 * @param text
 */
export function isComplexType(text: string): text is ComplexType {
    return hasSeparators(text) || isGeneric(text);
}
