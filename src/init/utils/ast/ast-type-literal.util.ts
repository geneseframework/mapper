import { Node, SyntaxKind, TypeAliasDeclaration, TypeLiteralNode } from 'ts-morph';

export function isTypeLiteral(typeAliasDeclaration: TypeAliasDeclaration): boolean {
    return typeAliasDeclaration.getTypeNode().getKind() === SyntaxKind.TypeLiteral;
}


export function hasTypeLiteral(propertyDeclarationOrSignature: Node): boolean {
    return !!propertyDeclarationOrSignature.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
}


export function getFirstTypeLiteralAncestor(node: Node): TypeLiteralNode {
    return node.getFirstAncestorByKind(SyntaxKind.TypeLiteral);
}
