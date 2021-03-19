import { PropertyDeclaration, TypeLiteralNode } from 'ts-morph';

export class TypeLiteralProperty extends PropertyDeclaration {
    getTypeLiteralNode: () => TypeLiteralNode = () => this.getTypeNode() as TypeLiteralNode;
}
