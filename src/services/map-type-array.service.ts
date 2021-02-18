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
    isPrimitiveTypeOrArrayOfPrimitiveTypeNodes,
    literalPrimitiveToPrimitiveType,
    primitiveLiteralValue
} from '../utils/primitives.util';
import * as chalk from 'chalk';
import { PrimitiveType } from '../types/primitives.type';
import { MapArrayService } from './map-array.service';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { getApparentType } from '../utils/ast-types.util';
import { partialClone } from '../utils/arrays.util';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapDeclarationService } from './map-declaration.service';
import { newMappedElement } from '../utils/mapping.util';
import { MapTypeService } from './map-type.service';

export class MapTypeArrayService {


    static mapTypeNodesArray(target: any, key: string, dataValue: any, typeNodes: TypeNode[], typeProperties: any[]): void {
        const typeNode: TypeNode = typeNodes[0];
        if (isPrimitiveOrArrayOfPrimitivesValue(dataValue)) {
            this.mapTypesNodesPrimitivesOrPrimitivesArray(target, key, dataValue, typeNode, typeNodes, typeProperties);
        } else {
            for (const dataKey of Object.keys(dataValue)) {
                typeProperties.push(dataKey);
                if (this.isKeyType(dataKey, typeNode)) {
                    MapTypeService.mapTypeNode(target, key, dataValue, typeNode);
                } else {
                    const nextTypeNodes: TypeNode[] = partialClone(typeNodes, 1);
                    const indexOfNextTypeNodeIncludingKeys: number = this.getIndexOfNextTypeNodeIncludingKeys(typeProperties, nextTypeNodes, dataValue);
                    if (indexOfNextTypeNodeIncludingKeys !== undefined) {
                        const nextTypeNodesIncludingKeys: TypeNode[] = nextTypeNodes.slice(indexOfNextTypeNodeIncludingKeys);
                        this.mapTypeNodesArray(target, key, dataValue, nextTypeNodesIncludingKeys, typeProperties);
                    }
                }
            }
        }
    }


    private static mapTypesNodesPrimitivesOrPrimitivesArray(target: any, key: string, dataValue: any, typeNode: TypeNode, typeNodes: TypeNode[], typeProperties: any[]): void {
        const nextTypeNodes: TypeNode[] = partialClone(typeNodes, 1);
        if (Array.isArray(dataValue)) {
            this.mapTypesNodesPrimitivesArray(target, key, dataValue, typeNode, nextTypeNodes);
        } else {
            this.mapTypesNodesPrimitive(target, key, dataValue, typeNode, typeNodes, typeProperties);
        }
    }


    private static mapTypesNodesPrimitivesArray(target: any, key: string, dataValue: any[], typeNode: TypeNode, nextTypeNodes: TypeNode[]): void {
        if (!isArrayOfPrimitiveTypeNodes(typeNode)) {
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
            console.log(chalk.magentaBright('TODO : is array of primitive nodes'), dataValue, typeNode.getText().slice(1, -1), isLiteralKeyword(typeNode));
            return;
        }
    }


    private static mapTypesNodesPrimitive(target: any, key: string, dataValue: any, typeNode: TypeNode, typeNodes: TypeNode[], typeProperties: any[]): void {
        if (isLiteralKeyword(typeNode) || (!isLiteralKeyword(typeNode) && dataValue?.toString() === primitiveLiteralValue(typeNode as LiteralTypeNode))) {
            target[key] = dataValue;
        } else if (isLiteralPrimitive(typeNode)) {
            // TODO : check if we should return something
            // console.log(chalk.redBright('Is Literal primitive : '), target, key, dataValue, typeNode.getKindName(), typeNodes.map(t => t.getKindName()), typeProperties.length);
            return;
        } else if (typeNodes.length > 1) {
            this.mapTypeNodesArray(target, key, dataValue, typeNodes.slice(1), typeProperties);
        } else {
            console.log(chalk.redBright('Unknown primitive literal type : '), target, key, dataValue, typeNode.getKindName(), typeNodes.map(t => t.getKindName()), typeProperties.length);
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


    private static isKeyType(keys: string[], typeNode: TypeNode, dataValue?: any): boolean
    private static isKeyType(key: string, typeNode: TypeNode, dataValue?: any): boolean
    private static isKeyType(keys: string | string[], typeNode: TypeNode, dataValue?: any): boolean {
        if (Array.isArray(keys)) {
            return keys.every(key => this.isKeyInType(key, typeNode, dataValue));
        } else {
            return this.isKeyInType(keys, typeNode, dataValue);
        }

    }


    private static isKeyInType(key: string, typeNode: TypeNode, value?: any): boolean {
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
