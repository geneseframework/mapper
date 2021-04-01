import { IndexSignatureDeclaration, IndexSignatureDeclarationStructure, SyntaxKind } from 'ts-morph';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { IndexableType } from '../../../shared/types/indexable-type.type';

/**
 * Returns the eventual IndexableType corresponding to a given ClassDeclaration or InterfaceDeclaration
 * @param declaration   // The declaration to check
 */
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
