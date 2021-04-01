import { StringOrNumber } from '../types/trivial-types/string-or-number.type';
import { ClassOrInterfaceInfo } from '../../shared/types/class-or-interface-info.type';
import { isNumeric } from '../../shared/types/numeric.type';
import { areBothTrueOrFalse } from '../types/others/same-booleans.type';
import { IndexableType } from '../../shared/types/indexable-type.type';

/**
 * Checks if a classInfo or InterfaceInfo has an indexable type and if the parameter 'key' corresponds to the type of the indexable key
 * @param declaration   // The declaration to compare
 * @param key           // The key to compare
 */
export function hasIndexableTypeAndKeyOfSameType(declaration: ClassOrInterfaceInfo, key: StringOrNumber): boolean {
    return declaration.indexableType && keyHasSameTypeThanIndexable(key, declaration.indexableType);
}

/**
 * Checks if a classInfo or InterfaceInfo has an indexable type and if the parameter 'key' corresponds to the type of the indexable key
 * @param key           // The key to compare
 * @param indexableType // The indexable type of the declaration
 */
export function keyHasSameTypeThanIndexable(key: StringOrNumber, indexableType: IndexableType): boolean {
    return areBothTrueOrFalse([hasNumericKey(indexableType), isNumeric(key?.toString())]);
}

/**
 * Checks if the type of an IndexableType is 'number'
 * @param indexableType
 */
export function hasNumericKey(indexableType: IndexableType): boolean {
    return indexableType?.type === 'number';
}

