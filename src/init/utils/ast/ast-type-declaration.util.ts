import { SyntaxKind, TypeAliasDeclaration } from 'ts-morph';

export function isTypeLiteral(typeAliasDeclaration: TypeAliasDeclaration): boolean {
    return typeAliasDeclaration.getTypeNode().getKind() === SyntaxKind.TypeLiteral;
}
