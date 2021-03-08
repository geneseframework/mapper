import { IndexableType } from '../../types/indexable-type.type';
import { IndexSignatureDeclaration, IndexSignatureDeclarationStructure, SyntaxKind } from 'ts-morph';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { throwWarning } from '../errors.util';
import { StringOrNumber } from '../../types/string-or-number.type';
import { isNumericString } from './strings.util';
import { areBothTrueOrFalse } from './any.util';
import { ClassOrInterfaceInfo } from '../../types/class-or-interface-info.type';


export function hasIndexableTypeAndKeyOfSameType(declaration: ClassOrInterfaceInfo, key: StringOrNumber): boolean {
    return declaration.indexableType && keyHasSameTypeThanIndexable(key, declaration.indexableType);
}

// export function hasIndexableTypeAndKeyOfSameTypeOld(declaration: ClassOrInterfaceDeclaration, key: StringOrNumber): boolean {
//     return hasIndexableType(declaration) && keyHasSameTypeThanIndexable(key, getIndexableType(declaration));
// }

// export function hasIndexableType(declaration: ClassOrInterfaceDeclaration): boolean {
//     return declaration.getDescendantsOfKind(SyntaxKind.IndexSignature).length > 0;
// }



export function getIndexableType(declaration: ClassOrInterfaceDeclaration): IndexableType {
    const indexSignatures: IndexSignatureDeclaration[] = declaration.getDescendantsOfKind(SyntaxKind.IndexSignature);
    if (indexSignatures.length === 0) {
        return undefined;
    } else if (indexSignatures.length === 1) {
        const structure: IndexSignatureDeclarationStructure = indexSignatures[0].getStructure();
        return {
            returnType: structure.returnType as string,
            type: structure.keyType === 'string' ? 'string' : 'number',
        }
    }
}


function getIndexableKey(indexSignature: IndexSignatureDeclaration): IndexableType {
    return {returnType: keyReturnType(indexSignature), type: keyType(indexSignature)};
}


function keyReturnType(indexSignature: IndexSignatureDeclaration): string {
    return indexSignature?.getStructure()?.returnType as string;
}


function keyType(indexSignature: IndexSignatureDeclaration): 'string' | 'number' {
    return indexSignature?.getStructure()?.keyType as 'string' | 'number';
}


export function keyHasSameTypeThanIndexable(key: StringOrNumber, indexableType: IndexableType): boolean {
    return areBothTrueOrFalse(hasNumericKey(indexableType), isNumericString(key?.toString()));
}

export function hasNumericKey(indexableType: IndexableType): boolean {
    return indexableType?.type === 'number';
}

