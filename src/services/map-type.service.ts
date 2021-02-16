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
import { TypeDeclaration } from '../types/class-or-enum-declaration.type';
import * as chalk from 'chalk';
import { MapInstanceService } from './map-instance.service';
import { PrimitiveType, PrimitiveTypes } from '../types/primitives.type';
import { MapArrayService } from './map-array.service';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { getApparentType } from '../utils/ast-types.util';
import { partialClone } from '../utils/arrays.util';
import { DeclarationService } from './declaration.service';

export class MapTypeService {


    static createTypes<T>(data: any[], typeOrArrayTypeName: string): T[]
    static createTypes<T>(data: any, typeOrArrayTypeName: string): T
    static createTypes<T>(data: any, typeOrArrayTypeName: string): T | T[] {
        const typeName: string = this.getTypeName(typeOrArrayTypeName);
        // console.log(chalk.yellowBright('CREATE TYPESSSSS'), data, typeName);
        const typeAliasDeclaration: TypeAliasDeclaration = DeclarationService.getDeclaration(typeName, 'TypeAliasDeclaration');
        // console.log(chalk.yellowBright('ALIAS TYPESSSSS'), typeAliasDeclaration?.getName());
        if (Array.isArray(data) && this.isArrayType(typeOrArrayTypeName)) {
            const typesArray: T[] = [];
            for (const element of data) {
                const instance: T = this.mapData<T>(element, typeAliasDeclaration);
                typesArray.push(instance);
            }
            return typesArray;
        } else if (!Array.isArray(data) && !this.isArrayType(typeOrArrayTypeName)) {
            return this.mapData<T>(data, typeAliasDeclaration);
        }
    }


    private static getTypeName(typeOrArrayTypeName: string): string {
        return this.isArrayType(typeOrArrayTypeName) ? typeOrArrayTypeName.slice(0, -2) : typeOrArrayTypeName;
    }


    private static isArrayType(typeOrArrayTypeName: string): boolean {
        return typeOrArrayTypeName.slice(-2) === '[]';
    }


    // private static mapArrayType(data: any[], arrayTypeName: string): void {
    //
    // }


    private static mapData<T>(dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): T {
        const rootValue: T = undefined;
        const target: { root: T } = { root: rootValue };
        for (const key of Object.keys(dataValue)) {
            this.mapTypeType(target, 'root', dataValue, typeAliasDeclaration);
        }
        return target.root;
    }


    // TODO : Types which are not unions
    static mapTypeType(target: any, key: string, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): void {
        this.mapTypeNode(target, key, dataValue, typeAliasDeclaration.getTypeNode());
    }


    static mapTypeNode(target: any, key: string, dataValue: any, typeNode: TypeNode) {
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
                // if (!isLiteralPrimitive(typeNode)) {
                //     return;
                // } else if (isLiteralKeyword(typeNode) || (!isLiteralKeyword(typeNode) && dataValue === typeNode.getText().slice(1, -1))) {
                //     target[key] = dataValue;
                //     return;
                // } else if (typeNodes.length > 1) {
                //     this.mapTypeNodesArray(target, key, dataValue, typeNodes.slice(1), typeProperties);
                //     return;
                // }
                // return;
            }
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
            target[key] = MapPrimitiveService.create(dataValue, literalPrimitiveToPrimitiveType(literalType));
            return;
        }
// TODO : Literal objects, true, false, null,...
    }


    private static mapLiteralTypeReference(target: any, key: string, dataValue: any, typeReferenceNode: TypeReferenceNode): void {
        const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(typeReferenceNode);
        MapInstanceService.mapTypeDeclaration(typeDeclaration, target, typeDeclaration.getName(), key, dataValue);
    }


    private static mapArrayType(target: any, key: string, dataValue: any, arrayTypeNode: ArrayTypeNode): void {
        if (isPrimitiveTypeOrArrayOfPrimitiveTypeNodes(arrayTypeNode.getText())) {
            target[key] = MapPrimitiveService.create(dataValue, arrayTypeNode.getText() as PrimitiveTypes);
            return;
        }
        MapArrayService.mapArrayType(target, key, dataValue, arrayTypeNode.getText(), getApparentType(arrayTypeNode));
    }


    private static mapPrimitiveKeywordType(target: any, key: string, dataValue: any, primitiveKeyword: TypeNode): void {
        target[key] = MapPrimitiveService.create(dataValue, primitiveKeyword.getText() as PrimitiveType);
    }

}
