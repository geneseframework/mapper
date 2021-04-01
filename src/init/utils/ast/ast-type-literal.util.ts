import { Node, SyntaxKind, TypeLiteralNode } from 'ts-morph';

/**
 * Checks if a Node has a descendant which is a TypeLiteral
 * @param node      // The node to check
 */
export function hasTypeLiteral(node: Node): boolean {
    return !!node.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
}

/**
 * Returns the first TypeLiteral which is an ancestor of a given Node
 * @param node      // The node to check
 */
export function getFirstTypeLiteralAncestor(node: Node): TypeLiteralNode {
    return node.getFirstAncestorByKind(SyntaxKind.TypeLiteral);
}
