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
    isLiteralKeyword,
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

export class MapTypeService {


    static createTypes<T>(data: any[], typeName: string, isArray: boolean): T[]
    static createTypes<T>(data: any, typeName: string, isArray: boolean): T
    static createTypes<T>(data: any, typeName: string, isArray: boolean): T | T[] {
        const typeAliasDeclaration: TypeAliasDeclaration = getTypeDeclaration(typeName) as TypeAliasDeclaration;
        if (Array.isArray(data) && isArray) {
            return this.createTypesArray(data, typeAliasDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createType(data, typeAliasDeclaration);
        } else {
            return undefined;
        }
    }


    private static createTypesArray<T>(data: any[], typeAliasDeclaration: TypeAliasDeclaration): T[] {
        const typesArray: T[] = [];
        for (const element of data) {
            const instance: T = this.mapData<T>(element, typeAliasDeclaration);
            typesArray.push(instance);
        }
        return typesArray;
    }


    private static createType<T>(data: any, typeAliasDeclaration: TypeAliasDeclaration): T {
        return this.mapData<T>(data, typeAliasDeclaration);
    }


    private static mapData<T>(dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): T {
        return newMappedElement(this.map, dataValue, typeAliasDeclaration);
    }


    // TODO : Types which are not unions
    static map(target: any, key: string, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): void {
        MapTypeService.mapTypeNode(target, key, dataValue, typeAliasDeclaration.getTypeNode());
    }


    static mapTypeNode(target: any, key: string, dataValue: any, typeNode: TypeNode) {
        console.log(chalk.magentaBright('MapDeclarationServiceeeeeee '), target, key, dataValue, target[key], typeNode.getKindName());
        switch (typeNode.getKind()) {
            case SyntaxKind.UnionType:
                this.mapUnionType(target, key, dataValue, typeNode as UnionTypeNode);
                break;
            case SyntaxKind.TypeReference:
                this.mapLiteralTypeReference(target, key, dataValue, typeNode as TypeReferenceNode);
                break;
            case SyntaxKind.LiteralType:
                this.mapLiteralType(target, key, dataValue, typeNode as LiteralTypeNode);
                break;
            case SyntaxKind.StringKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BooleanKeyword:
                this.mapPrimitiveKeywordType(target, key, dataValue, typeNode);
                break;
            case SyntaxKind.ArrayType:
                this.mapArrayType(target, key, dataValue, typeNode as ArrayTypeNode);
                break;
            default:
                console.log(chalk.redBright('Unknown kind of TypeNode : '), typeNode.getKindName());
        }
    }


    /**
     * Returns the first differentiating type of the union
     * @param target
     * @param key
     * @param dataValue
     * @param unionTypeNode
     * @private
     */
    private static mapUnionType(target: any, key: string, dataValue: any, unionTypeNode: UnionTypeNode): void {
        this.mapTypeNodesArray(target, key, dataValue, unionTypeNode.getTypeNodes(), []);
    }


    private static mapTypeNodesArray(target: any, key: string, dataValue: any, typeNodes: TypeNode[], typeProperties: any[]): void {
        const typeNode: TypeNode = typeNodes[0];
        if (isPrimitiveOrArrayOfPrimitivesValue(dataValue)) {
            this.mapTypesNodesPrimitivesArray(target, key, dataValue, typeNode, typeNodes, typeProperties);
        } else {
            for (const dataKey of Object.keys(dataValue)) {
                typeProperties.push(dataKey);
                if (this.isKeyType(dataKey, typeNode)) {
                    this.mapTypeNode(target, key, dataValue, typeNode);
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


    private static mapTypesNodesPrimitivesArray(target: any, key: string, dataValue: any, typeNode: TypeNode, typeNodes: TypeNode[], typeProperties: any[]): void {
        const nextTypeNodes: TypeNode[] = partialClone(typeNodes, 1);
        if (Array.isArray(dataValue)) {
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
        } else {
            if (isLiteralKeyword(typeNode) || (!isLiteralKeyword(typeNode) && dataValue === typeNode.getText().slice(1, -1))) {
                target[key] = dataValue;
                return;
            } else if (typeNodes.length > 1) {
                this.mapTypeNodesArray(target, key, dataValue, typeNodes.slice(1), typeProperties);
                return;
            }
            return;
        }
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
                    if (key.includes('nickNames')) {
                        console.log(chalk.blueBright('IS KEY IN TYPEEEEE ?'), key, typeDeclaration.getName(), typeDeclaration.getProperties().map(p => p.getName()));
                    }
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


    private static getIndexOfNextTypeNodeIncludingKeys(properties: string[], typeNodes: TypeNode[], dataValue: any): number {
        for (let i = 0; i < typeNodes.length; i++) {
            if (this.isKeyType(properties, typeNodes[i], dataValue)) {
                return i;
            }
        }
        return undefined;
    }


    private static getIndexOfNextArrayOfPrimitiveTypes(typeNodes: TypeNode[]): number {
        const typeNodeIndex: number = typeNodes.findIndex(t => isArrayOfPrimitiveTypeNodes(t));
        return typeNodeIndex > -1 ? typeNodeIndex : undefined;
    }


    private static mapLiteralType(target: any, key: string, dataValue: any, literalType: LiteralTypeNode): void {
        if (isPrimitiveTypeNode(literalType) && primitiveLiteralValue(literalType) === dataValue) {
            target[key] = MapPrimitiveService.create(dataValue, literalPrimitiveToPrimitiveType(literalType), false);
            return;
        }
// TODO : Literal objects, true, false, null,...
    }


    private static mapLiteralTypeReference(target: any, key: string, dataValue: any, typeReferenceNode: TypeReferenceNode): void {
        const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(typeReferenceNode);
        MapDeclarationService.map(target, typeDeclaration.getName(), key, dataValue, typeDeclaration);
    }


    private static mapArrayType(target: any, key: string, dataValue: any, arrayTypeNode: ArrayTypeNode): void {
        if (isPrimitiveTypeOrArrayOfPrimitiveTypeNodes(arrayTypeNode.getText())) {
            target[key] = MapPrimitiveService.create(dataValue, arrayTypeNode.getText() as PrimitiveType, true);
            return;
        }
        MapArrayService.map(target, key, dataValue, arrayTypeNode.getText(), getApparentType(arrayTypeNode));
    }


    private static mapPrimitiveKeywordType(target: any, key: string, dataValue: any, primitiveKeyword: TypeNode): void {
        target[key] = MapPrimitiveService.create(dataValue, primitiveKeyword.getText() as PrimitiveType, false);
    }

}
