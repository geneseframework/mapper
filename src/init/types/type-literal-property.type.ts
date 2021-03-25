import { PropertyDeclaration, SyntaxKind, TypeLiteralNode, TypeNode } from 'ts-morph';
import { PropertyDeclarationOrSignature } from './property-declaration-or-signature.type';

export class TypeLiteralProperty extends PropertyDeclaration {
    getTypeNode: () => TypeLiteralNode = () => this.getTypeNode() as TypeLiteralNode;
}


export function isTypeLiteralProperty(propertyDeclaration: PropertyDeclarationOrSignature): propertyDeclaration is TypeLiteralProperty {
    return isTypeLiteralNode(propertyDeclaration?.getTypeNode());
}


export function isTypeLiteralNode(typeNode: TypeNode): typeNode is TypeLiteralNode {
    return typeNode?.getKind() === SyntaxKind.TypeLiteral;
}
