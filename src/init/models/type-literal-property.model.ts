import { PropertyDeclaration, SyntaxKind, TypeLiteralNode, TypeNode } from 'ts-morph';
import { PropertyDeclarationOrSignature } from '../types/property-declaration-or-signature.type';

/**
 * Class extending PropertyDeclaration Node with adding the certitude the the getTypeNode() method will return a TypeLiteral Node
 */
export class TypeLiteralProperty extends PropertyDeclaration {
    getTypeNode: () => TypeLiteralNode = () => this.getTypeNode();
}

/**
 * Checks if the TypeNode of a given PropertyDeclaration or PropertySignature is a TypeLiteral Property
 * @param propertyDeclaration   // The PropertyDeclaration to check
 */
export function isTypeLiteralProperty(propertyDeclaration: PropertyDeclarationOrSignature): propertyDeclaration is TypeLiteralProperty {
    return isTypeLiteralNode(propertyDeclaration?.getTypeNode());
}

/**
 * Checks if a given TypeNode is a TypeLiteral Node
 * @param typeNode      // The TypeNode to check
 */
export function isTypeLiteralNode(typeNode: TypeNode): typeNode is TypeLiteralNode {
    return typeNode?.getKind() === SyntaxKind.TypeLiteral;
}
