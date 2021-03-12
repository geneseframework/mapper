import { IndexableType } from '../../types/indexable-type.type';
import { StringOrNumber } from '../../types/string-or-number.type';
import { isNumericString } from './strings.util';
import { areBothTrueOrFalse } from './any.util';
import { ClassOrInterfaceInfo } from '../../types/class-or-interface-info.type';


export function hasIndexableTypeAndKeyOfSameType(declaration: ClassOrInterfaceInfo, key: StringOrNumber): boolean {
    return declaration.indexableType && keyHasSameTypeThanIndexable(key, declaration.indexableType);
}


//
// export function getIndexableType(declaration: ClassOrInterfaceDeclaration): IndexableType {
//     const indexSignatures: IndexSignatureDeclaration[] = declaration.getDescendantsOfKind(SyntaxKind.IndexSignature);
//     if (indexSignatures.length === 0) {
//         return undefined;
//     } else if (indexSignatures.length === 1) {
//         const structure: IndexSignatureDeclarationStructure = indexSignatures[0].getStructure();
//         return {
//             returnType: structure.returnType as string,
//             type: structure.keyType === 'string' ? 'string' : 'number',
//         }
//     }
// }
//
//
// function getIndexableKey(indexSignature: IndexSignatureDeclaration): IndexableType {
//     return {returnType: keyReturnType(indexSignature), type: keyType(indexSignature)};
// }
//
//
// function keyReturnType(indexSignature: IndexSignatureDeclaration): string {
//     return indexSignature?.getStructure()?.returnType as string;
// }
//
//
// function keyType(indexSignature: IndexSignatureDeclaration): 'string' | 'number' {
//     return indexSignature?.getStructure()?.keyType as 'string' | 'number';
// }


export function keyHasSameTypeThanIndexable(key: StringOrNumber, indexableType: IndexableType): boolean {
    return areBothTrueOrFalse(hasNumericKey(indexableType), isNumericString(key?.toString()));
}

export function hasNumericKey(indexableType: IndexableType): boolean {
    return indexableType?.type === 'number';
}

