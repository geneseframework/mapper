import { SyntaxKind, TypeLiteralNode, TypeNode } from 'ts-morph';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';
import { TypeLiteralProperty } from '../../types/type-literal-property.type';


export function isTypeLiteralProperty(propertyDeclaration: PropertyDeclarationOrSignature): propertyDeclaration is TypeLiteralProperty {
    return isTypeLiteral(propertyDeclaration?.getTypeNode());
}


export function isTypeLiteral(typeNode: TypeNode): typeNode is TypeLiteralNode {
    return typeNode?.getKind() === SyntaxKind.TypeLiteral;
}
