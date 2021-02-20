import {
    ArrayTypeNode,
    ClassDeclaration,
    LiteralTypeNode,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeNode,
    TypeReferenceNode,
    UnionTypeNode
} from 'ts-morph';
import { MapPrimitiveService } from './map-primitive.service';
import {
    isArrayOfPrimitiveTypeNodes,
    isLiteralKeyword, isLiteralPrimitive,
    isPrimitiveOrArrayOfPrimitivesValue,
    isPrimitiveTypeNode,
    isPrimitiveOrPrimitivesArray,
    literalPrimitiveToPrimitiveType,
    primitiveLiteralValue, typeOfDataCorrespondsToPrimitiveKeyword
} from '../utils/primitives.util';
import * as chalk from 'chalk';
import { PrimitiveElement, PrimitiveType } from '../types/primitives.type';
import { MapArrayService } from './map-array.service';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { getApparentType } from '../utils/ast-types.util';
import { isArray, partialClone } from '../utils/arrays.util';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapDeclarationService } from './map-declaration.service';
import { newMappedElement } from '../utils/mapping.util';
import { MapTypeService } from './map-type.service';
import { isNullOrUndefined } from '../utils/any.util';
import { Key } from '../types/key.type';

export class MapTypeArrayService {


    static mapTypeNodesArray(target: any, key: Key, dataValue: any, typeNodes: TypeNode[], typeProperties: any[]): void {
        const typeNode: TypeNode = typeNodes[0];
        // console.log(chalk.cyanBright('MAP ARRRRAY'), target, key, dataValue, typeNode.getKindName(), typeProperties);
        if (isPrimitiveOrArrayOfPrimitivesValue(dataValue)) {
            this.mapTypesNodesPrimitivesOrPrimitivesArray(target, key, dataValue, typeNode, typeNodes, typeProperties);
        } else {
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


    private static mapTypesNodesPrimitivesArray(target: any, key: Key, dataValue: any[], typeNode: TypeNode, nextTypeNodes: TypeNode[]): void {
        if (!isArrayOfPrimitiveTypeNodes(typeNode)) {
            // console.log(chalk.redBright('SHOULD NOT BE HERRRRRRE'), target, key, dataValue, typeNode.getKindName(), nextTypeNodes.map(n => n.getKindName()));
            const indexOfNextTypeNodeIncludingKeys: number = this.getIndexOfNextArrayOfPrimitiveTypes(nextTypeNodes);
            if (indexOfNextTypeNodeIncludingKeys !== undefined) {
                if (isLiteralKeyword((nextTypeNodes[indexOfNextTypeNodeIncludingKeys] as ArrayTypeNode).getElementTypeNode())) {
                    target[key] = dataValue;
                    return;
                } else {
                    // TODO : case of primitive Literals
                    console.log(chalk.redBright('TODO : array of primitive literal'));
                }
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


    private static isKeyInType(key: Key, typeNode: TypeNode, value?: any): boolean {
        switch (typeNode.getKind()) {
            case SyntaxKind.TypeReference:
                const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(typeNode as TypeReferenceNode);
                if (typeDeclaration instanceof ClassDeclaration) {
                    return !!typeDeclaration.getProperties().find(p => p.getName() === key);
                } else  {
                    return false;
                }
            case SyntaxKind.LiteralType:
                return value === typeNode.getText().slice(1, -1);
            case SyntaxKind.ArrayType:
                // TODO
                return false;
            default:
                console.log(chalk.redBright(`Unknown key in TypeNode : key ${key} not found in Type `), typeNode.getKindName());
                return false;
        }
    }


    private static getIndexOfNextArrayOfPrimitiveTypes(typeNodes: TypeNode[]): number {
        const typeNodeIndex: number = typeNodes.findIndex(t => isArrayOfPrimitiveTypeNodes(t));
        return typeNodeIndex > -1 ? typeNodeIndex : undefined;
    }

}
