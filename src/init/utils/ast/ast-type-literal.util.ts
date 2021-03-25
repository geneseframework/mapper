import { SyntaxKind, TypeLiteralNode, TypeNode } from 'ts-morph';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';
import { TypeLiteralProperty } from '../../types/type-literal-property.type';


export function isTypeLiteralProperty(propertyDeclaration: PropertyDeclarationOrSignature): propertyDeclaration is TypeLiteralProperty {
    return isTypeLiteralNode(propertyDeclaration?.getTypeNode());
}


export function isTypeLiteralNode(typeNode: TypeNode): typeNode is TypeLiteralNode {
    return typeNode?.getKind() === SyntaxKind.TypeLiteral;
}
