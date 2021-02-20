import { ArrayTypeNode, ClassDeclaration, LiteralTypeNode, SyntaxKind, TypeNode, TypeReferenceNode } from 'ts-morph';
import {
    isArrayOfPrimitiveTypeNodes,
    isLiteralKeyword,
    isLiteralPrimitive,
    isPrimitiveOrArrayOfPrimitivesValue,
    primitiveLiteralValue,
    typeOfDataCorrespondsToPrimitiveKeyword
} from '../utils/primitives.util';
import * as chalk from 'chalk';
import { PrimitiveElement } from '../types/primitives.type';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { isArray, partialClone } from '../utils/arrays.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapTypeService } from './map-type.service';
import { Key } from '../types/key.type';
import { throwWarning } from '../utils/errors.util';

export class MapTypeArrayService {


    static mapTypeNodesArray(target: any, key: Key, dataValue: any, typeNodes: TypeNode[], typeProperties: any[]): void {
        const typeNode: TypeNode = typeNodes[0];
        if (isPrimitiveOrArrayOfPrimitivesValue(dataValue)) {
            this.mapTypesNodesPrimitivesOrPrimitivesArray(target, key, dataValue, typeNode, typeNodes, typeProperties);
        } else if (isArray(dataValue) && typeNode.getKind() === SyntaxKind.ArrayType) {
            console.log(chalk.yellowBright('MapTypeArrayServiceeeeee'), target, key, dataValue, typeNode.getKindName(), (typeNode as ArrayTypeNode).getElementTypeNode()?.getKindName());
            const root = {}
            let i = 0;
            for (const element of dataValue) {
                this.mapTypeNodesArray(root, i, element, [(typeNode as ArrayTypeNode).getElementTypeNode()], typeProperties);
                i++
            }
            console.log(chalk.blueBright('ROOOOOOT'), root);
            target[key] = [...Object.values(root)];
        } else {
            console.log(chalk.greenBright('MapTypeArrayServiceeeeee'), target, key, dataValue, typeNode.getKindName());
            for (const dataKey of Object.keys(dataValue)) {
                typeProperties.push(dataKey);
                if (this.isKeyType(dataKey, typeNode, undefined)) {
                    MapTypeService.mapTypeNode(target, key, dataValue, typeNode);
                } else {
                    this.mapKeyType(target, key, typeNodes, typeProperties, dataValue);
                }
            }
        }
    }


    private static mapTypesNodesPrimitivesOrPrimitivesArray(target: any, key: Key, dataValue: any, typeNode: TypeNode, typeNodes: TypeNode[], typeProperties: any[]): void {
        const nextTypeNodes: TypeNode[] = partialClone(typeNodes, 1);
        if (isArray(dataValue)) {
            this.mapTypesNodesPrimitivesArray(target, key, dataValue, typeNode, nextTypeNodes);
        } else {
            this.mapTypesNodesPrimitive(target, key, dataValue, typeNode, typeNodes, typeProperties);
        }
    }


    private static mapTypesNodesPrimitivesArray(target: any, key: Key, dataValue: any[], typeNode: TypeNode, nextTypeNodes: TypeNode[] = []): void {
        if (!isArrayOfPrimitiveTypeNodes(typeNode)) {
            const indexOfNextTypeNodeIncludingKeys: number = this.getIndexOfNextArrayOfPrimitiveTypes(nextTypeNodes);
            if (indexOfNextTypeNodeIncludingKeys !== undefined) {
                this.mapTypesNodesPrimitivesArray(target, key, dataValue, nextTypeNodes[indexOfNextTypeNodeIncludingKeys]);
            }
            return;
        } else {
            const primitiveElements: PrimitiveElement[] = [];
            for (const element of dataValue) {
                if (typeOfDataCorrespondsToPrimitiveKeyword(element, typeNode as ArrayTypeNode)) {
                    primitiveElements.push(element);
                }
            }
            if (primitiveElements.length > 0) {
                target[key] = primitiveElements;
            }
            return;
        }
    }


    private static mapTypesNodesPrimitive(target: any, key: Key, dataValue: any, typeNode: TypeNode, typeNodes: TypeNode[], typeProperties: any[]): void {
        if (isLiteralKeyword(typeNode) || (!isLiteralKeyword(typeNode) && dataValue?.toString() === primitiveLiteralValue(typeNode as LiteralTypeNode))) {
            target[key] = dataValue;
        } else if (isLiteralPrimitive(typeNode)) {
            if (this.isKeyType(key, typeNode, dataValue)) {
                MapTypeService.mapTypeNode(target, key, dataValue, typeNode);
            } else {
                this.mapKeyType(target, key, typeNodes, typeProperties, dataValue);
            }
            return;
        } else if (typeNodes.length > 1) {
            this.mapTypeNodesArray(target, key, dataValue, typeNodes.slice(1), typeProperties);
        } else {
            console.log(chalk.redBright('Unknown primitive literal type : '), target, key, dataValue, typeNode.getKindName(), typeNodes.map(t => t.getKindName()), typeProperties.length);
        }
    }


    private static mapKeyType(target: any, key: Key, typeNodes: TypeNode[], typeProperties: any[], dataValue?: any): void {
        const nextTypeNodes: TypeNode[] = partialClone(typeNodes, 1);
        const indexOfNextTypeNodeIncludingKeys: number = this.getIndexOfNextTypeNodeIncludingKeys(typeProperties, nextTypeNodes, dataValue);
        if (indexOfNextTypeNodeIncludingKeys !== undefined) {
            const nextTypeNodesIncludingKeys: TypeNode[] = nextTypeNodes.slice(indexOfNextTypeNodeIncludingKeys);
            console.log(chalk.blueBright('mapKeyTypeeeee'), target, key, dataValue);
            this.mapTypeNodesArray(target, key, dataValue, nextTypeNodesIncludingKeys, typeProperties);
        }
    }


    private static getIndexOfNextTypeNodeIncludingKeys(properties: string[], typeNodes: TypeNode[], dataValue: any): number {
        for (let i = 0; i < typeNodes.length; i++) {
            if (this.isKeyType(properties, typeNodes[i], dataValue)) {
                return i;
            }
        }
        return undefined;
    }


    private static isKeyType(keys: Key[], typeNode: TypeNode, dataValue?: any): boolean
    private static isKeyType(key: Key, typeNode: TypeNode, dataValue?: any): boolean
    private static isKeyType(keys: Key | Key[], typeNode: TypeNode, dataValue?: any): boolean {
        if (Array.isArray(keys)) {
            return keys.every(key => this.isKeyInType(key, typeNode, dataValue));
        } else {
            return this.isKeyInType(keys, typeNode, dataValue);
        }

    }


    private static isKeyInType(key: Key, typeNode: TypeNode, dataValue?: any): boolean {
        console.log(chalk.cyanBright('isKeyInType TYPE'), key, typeNode.getKindName(), dataValue);
        console.log(chalk.magentaBright('isKeyInType typeNode.getText()'), typeNode.getText());
        switch (typeNode.getKind()) {
            case SyntaxKind.TypeReference:
                const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(typeNode as TypeReferenceNode);
                if (typeDeclaration instanceof ClassDeclaration) {
                    return !!typeDeclaration.getProperties().find(p => p.getName() === key);
                } else  {
                    return false;
                }
            case SyntaxKind.LiteralType:
                return dataValue === typeNode.getText().slice(1, -1);
            case SyntaxKind.ArrayType:
                if (!isArray(dataValue)) {
                    return false;
                } else {
                    for (const element of dataValue) {
                        console.log(chalk.greenBright('ARRAY TYPE'), key, typeNode.getKindName(), element, dataValue, (typeNode as ArrayTypeNode).getElementTypeNode()?.getKindName());
                        if (typeof element !== 'object') {
                            return false;
                        }
                        for (const elementKey of Object.keys(element)) {
                            console.log(chalk.yellowBright('ARRAY TYPEeeee'), key, typeNode.getKindName(), dataValue, elementKey, (typeNode as ArrayTypeNode).getElementTypeNode()?.getKindName());
                            console.log(chalk.redBright('IS KEY INNNNNN TYPE'), this.isKeyInType(elementKey, (typeNode as ArrayTypeNode).getElementTypeNode()));
                            if (!this.isKeyInType(elementKey, (typeNode as ArrayTypeNode).getElementTypeNode())) {
                                return false;
                            }
                        }
                    }
                    console.log(chalk.greenBright('ARRAY TYPEeeee OKKKKK'), key, typeNode.getKindName(), dataValue, (typeNode as ArrayTypeNode).getElementTypeNode()?.getKindName());
                     return true;
                }
                console.log(chalk.redBright('ARRAY TYPE'), key, typeNode.getKindName(), dataValue);
                // TODO
                return false;
            default:
                throwWarning(`Unknown key in TypeNode : key ${key} not found in Type ${typeNode.getKindName()}`);
                return false;
        }
    }


    private static getIndexOfNextArrayOfPrimitiveTypes(typeNodes: TypeNode[]): number {
        const typeNodeIndex: number = typeNodes.findIndex(t => isArrayOfPrimitiveTypeNodes(t));
        return typeNodeIndex > -1 ? typeNodeIndex : undefined;
    }

}
