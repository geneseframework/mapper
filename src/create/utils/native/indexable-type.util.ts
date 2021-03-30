import { IndexableType } from '../../types/indexable-type.type';
import { StringOrNumber } from '../../types/string-or-number.type';
import { ClassOrInterfaceInfo } from '../../../shared/types/class-or-interface-info.type';
import { isNumeric } from '../../../shared/types/numeric.type';
import { areBothTrueOrFalse } from '../../types/same-booleans.type';


export function hasIndexableTypeAndKeyOfSameType(declaration: ClassOrInterfaceInfo, key: StringOrNumber): boolean {
    return declaration.indexableType && keyHasSameTypeThanIndexable(key, declaration.indexableType);
}


export function keyHasSameTypeThanIndexable(key: StringOrNumber, indexableType: IndexableType): boolean {
    return areBothTrueOrFalse([hasNumericKey(indexableType), isNumeric(key?.toString())]);
}

export function hasNumericKey(indexableType: IndexableType): boolean {
    return indexableType?.type === 'number';
}

