import { IndexSignatureDeclaration, IndexSignatureDeclarationStructure, SyntaxKind } from 'ts-morph';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { IndexableTypeInit } from '../../types/indexable-type-init.type';


export function getIndexableType(declaration: ClassOrInterfaceDeclaration): IndexableTypeInit {
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


// function getIndexableKey(indexSignature: IndexSignatureDeclaration): IndexableType {
//     return {returnType: keyReturnType(indexSignature), type: keyType(indexSignature)};
// }


function keyReturnType(indexSignature: IndexSignatureDeclaration): string {
    return indexSignature?.getStructure()?.returnType as string;
}


function keyType(indexSignature: IndexSignatureDeclaration): 'string' | 'number' {
    return indexSignature?.getStructure()?.keyType as 'string' | 'number';
}
