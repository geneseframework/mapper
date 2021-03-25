import { PropertyDeclaration, SourceFile, TypeLiteralNode, TypeNode } from 'ts-morph';
import { capitalize } from '../../shared/utils/strings.util';

export class TypeLiteralProperty extends PropertyDeclaration {
    getTypeLiteralNode: () => TypeLiteralNode = () => this.getTypeNode() as TypeLiteralNode;
}


export class HasTypeLiteralNode {
    path: string = undefined;
    declarationName: string = undefined;
    propertyName: string = undefined;
    typeLiteralNode: TypeLiteralNode = undefined;

    constructor(declarationName: string, propertyName: string, path: string, typeLiteralNode: TypeLiteralNode) {
    // constructor(path: string, typeNode: TypeNode, typeLiteralNode: TypeLiteralNode) {
        this.path = path;
        this.declarationName = declarationName;
        this.propertyName = propertyName;
        this.typeLiteralNode = typeLiteralNode;
    }

    get interfaceInfoName(): string {
        return `${this.declarationName}${capitalize(this.propertyName)}`;
    }
}
