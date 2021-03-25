import { PropertySignature, TypeLiteralNode } from 'ts-morph';
import * as chalk from 'chalk';

export class TypeLiteralDeclaration {

    _name: string;
    _typeLiteralNode: TypeLiteralNode;

    constructor(name: string, typeLiteralNode: TypeLiteralNode) {
        this._name = name;
        this._typeLiteralNode = typeLiteralNode;
    }

    // This method is called in getPropertiesAndAddInterfaceInfoIfHasTypeLiteral()
    getName(): string {
        return this._name;
    }

    // This method is called in getPropertiesAndAddInterfaceInfoIfHasTypeLiteral()
    getProperties(): PropertySignature[] {
        console.log(chalk.redBright('GET PROPS.??????'), this.getName());
        return this._typeLiteralNode.getProperties();
    }
}
