import { PropertySignature, TypeLiteralNode } from 'ts-morph';
import { sourceFilePath } from '../utils/ast/ast-sourcefile.util';
import * as chalk from 'chalk';

export class TypeLiteralDeclaration {

    _name: string;
    _typeLiteralNode: TypeLiteralNode;

    constructor(name: string, typeLiteralNode: TypeLiteralNode) {
        this._name = name;
        this._typeLiteralNode = typeLiteralNode;
    }


    getName(): string {
        return this._name;
    }


    getProperties(): PropertySignature[] {
        return this._typeLiteralNode.getProperties();
    }


    get typeLiteralNode(): TypeLiteralNode {
        return this._typeLiteralNode;
    }


    get sourceFilePath(): string {
        return sourceFilePath(this._typeLiteralNode);
    }
}
