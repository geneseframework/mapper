import { ArrayTypeNode, ClassDeclaration, LiteralTypeNode, SyntaxKind, TypeNode, TypeReferenceNode } from 'ts-morph';
import {
    isArrayOfPrimitiveTypeNodes,
    isLiteralKeyword,
    isLiteralPrimitive,
    isPrimitiveOrArrayOfPrimitivesValue,
    primitiveLiteralValue,
    typeOfDataCorrespondsToPrimitiveKeyword
} from '../utils/primitives.util';
import { PrimitiveElement } from '../types/primitives.type';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { isArray, partialClone } from '../utils/arrays.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapTypeService } from './map-type.service';
import { Key } from '../types/key.type';
import { throwWarning } from '../utils/errors.util';

export class MapTypeArrayService {


    static async mapTypeNodesArray(target: any, key: Key, dataValue: any, typeNodes: TypeNode[], typeProperties: any[]): Promise<void> {
        const typeNode: TypeNode = typeNodes[0];
        if (isPrimitiveOrArrayOfPrimitivesValue(dataValue)) {
            await this.mapTypesNodesPrimitivesOrPrimitivesArray(target, key, dataValue, typeNode, typeNodes, typeProperties);
        } else if (this.isArrayOfNonPrimitives(dataValue, typeNode)) {
            await this.mapTypesNodesNonPrimitivesArray(target, key, dataValue, typeNode, typeProperties);
        } else {
            await this.mapDataKeys(target, key, dataValue, typeNode, typeNodes, typeProperties);
        }
    }


    private static async mapTypesNodesPrimitivesOrPrimitivesArray(target: any, key: Key, dataValue: any, typeNode: TypeNode, typeNodes: TypeNode[], typeProperties: any[]): Promise<void> {
        const nextTypeNodes: TypeNode[] = partialClone(typeNodes, 1);
        if (isArray(dataValue)) {
            this.mapTypesNodesPrimitivesArray(target, key, dataValue, typeNode, nextTypeNodes);
        } else {
            await this.mapTypesNodesPrimitive(target, key, dataValue, typeNode, typeNodes, typeProperties);
        }
    }


    private static async mapTypesNodesNonPrimitivesArray(target: any, key: Key, dataValue: any, typeNode: TypeNode, typeProperties: any[]): Promise<void> {
        const root = {}
        let i = 0;
        for (const element of dataValue) {
            await this.mapTypeNodesArray(root, i, element, [(typeNode as ArrayTypeNode).getElementTypeNode()], typeProperties);
            i++
        }
        target[key] = [...Object.values(root)];
    }


    private static async mapDataKeys(target: any, key: Key, dataValue: any, typeNode: TypeNode, typeNodes: TypeNode[], typeProperties: any[]): Promise<void> {
        for (const dataKey of Object.keys(dataValue)) {
            typeProperties.push(dataKey);
            if (this.isKeyType(dataKey, typeNode, undefined)) {
                await MapTypeService.mapTypeNode(target, key, dataValue, typeNode);
            } else {
                await this.mapKeyType(target, key, typeNodes, typeProperties, dataValue);
            }
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


    private static async mapTypesNodesPrimitive(target: any, key: Key, dataValue: any, typeNode: TypeNode, typeNodes: TypeNode[], typeProperties: any[]): Promise<void> {
        if (isLiteralKeyword(typeNode) || (!isLiteralKeyword(typeNode) && dataValue?.toString() === primitiveLiteralValue(typeNode as LiteralTypeNode))) {
            target[key] = dataValue;
        } else if (isLiteralPrimitive(typeNode)) {
            if (this.isKeyType(key, typeNode, dataValue)) {
                await MapTypeService.mapTypeNode(target, key, dataValue, typeNode);
            } else {
                await this.mapKeyType(target, key, typeNodes, typeProperties, dataValue);
            }
            return;
        } else if (typeNodes.length > 1) {
            await this.mapTypeNodesArray(target, key, dataValue, typeNodes.slice(1), typeProperties);
        } else {
            throwWarning(`Unknown primitive literal type : \nTarget: ${target}\nKey: key\nDataValue: ${dataValue}\nTypeNode: ${typeNode.getKindName()}`);
        }
    }


    private static async mapKeyType(target: any, key: Key, typeNodes: TypeNode[], typeProperties: any[], dataValue?: any): Promise<void> {
        const nextTypeNodes: TypeNode[] = partialClone(typeNodes, 1);
        const indexOfNextTypeNodeIncludingKeys: number = this.getIndexOfNextTypeNodeIncludingKeys(typeProperties, nextTypeNodes, dataValue);
        if (indexOfNextTypeNodeIncludingKeys !== undefined) {
            const nextTypeNodesIncludingKeys: TypeNode[] = nextTypeNodes.slice(indexOfNextTypeNodeIncludingKeys);
            await this.mapTypeNodesArray(target, key, dataValue, nextTypeNodesIncludingKeys, typeProperties);
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
                        if (typeof element !== 'object') {
                            return false;
                        }
                        for (const elementKey of Object.keys(element)) {
                            if (!this.isKeyInType(elementKey, (typeNode as ArrayTypeNode).getElementTypeNode())) {
                                return false;
                            }
                        }
                    }
                     return true;
                }
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


    private static isArrayOfNonPrimitives(dataValue: any, typeNode: TypeNode): boolean {
        return isArray(dataValue) && typeNode.getKind() === SyntaxKind.ArrayType;
    }

}
