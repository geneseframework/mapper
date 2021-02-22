import {
    ArrayTypeNode,
    LiteralTypeNode,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeNode,
    TypeReferenceNode,
    UnionTypeNode
} from 'ts-morph';
import { MapPrimitiveService } from './map-primitive.service';
import {
    isPrimitiveTypeNode,
    isPrimitiveOrPrimitivesArray,
    literalPrimitiveToPrimitiveType,
    primitiveLiteralValue
} from '../utils/primitives.util';
import * as chalk from 'chalk';
import { PrimitiveType } from '../types/primitives.type';
import { MapArrayService } from './map-array.service';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { getApparentType } from '../utils/ast-types.util';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapDeclarationService } from './map-declaration.service';
import { newMappedElement } from '../utils/mapping.util';
import { MapTypeArrayService } from './map-type-array.service';
import { isNullOrUndefined } from '../utils/any.util';
import { Key } from '../types/key.type';

export class MapTypeService {


    static async createTypes<T>(data: any[], typeName: string, isArray: boolean): Promise<T[]>
    static async createTypes<T>(data: any, typeName: string, isArray: boolean): Promise<T>
    static async createTypes<T>(data: any, typeName: string, isArray: boolean): Promise<T | T[]> {
        console.log(chalk.blueBright('MAP TYPPPPPP'), data, typeName);
        const typeAliasDeclaration: TypeAliasDeclaration = getTypeDeclaration(typeName) as TypeAliasDeclaration;
        if (Array.isArray(data) && isArray) {
            return this.createTypesArray(data, typeAliasDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createType(data, typeAliasDeclaration);
        } else {
            return undefined;
        }
    }


    private static async createTypesArray<T>(data: any[], typeAliasDeclaration: TypeAliasDeclaration): Promise<T[]> {
        const typesArray: T[] = [];
        for (const element of data) {
            const instance: T = await this.mapData<T>(element, typeAliasDeclaration);
            typesArray.push(instance);
        }
        return typesArray;
    }


    private static async createType<T>(data: any, typeAliasDeclaration: TypeAliasDeclaration): Promise<T> {
        return await this.mapData<T>(data, typeAliasDeclaration);
    }


    private static async mapData<T>(dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): Promise<T> {
        return await newMappedElement(this.map, dataValue, typeAliasDeclaration);
    }


    static async map(target: any, key: Key, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): Promise<void> {
        await MapTypeService.mapTypeNode(target, key, dataValue, typeAliasDeclaration.getTypeNode());
    }


    static async mapTypeNode(target: any, key: Key, dataValue: any, typeNode: TypeNode): Promise<void> {
        if (isNullOrUndefined(dataValue)) {
            target[key] = dataValue;
            return;
        }
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
                await this.mapArrayType(target, key, dataValue, typeNode as ArrayTypeNode);
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
    private static mapUnionType(target: any, key: Key, dataValue: any, unionTypeNode: UnionTypeNode): void {
        MapTypeArrayService.mapTypeNodesArray(target, key, dataValue, unionTypeNode.getTypeNodes(), []);
    }


    private static mapLiteralType(target: any, key: Key, dataValue: any, literalType: LiteralTypeNode): void {
        if (isPrimitiveTypeNode(literalType) && primitiveLiteralValue(literalType) === dataValue) {
            target[key] = MapPrimitiveService.create(dataValue, literalPrimitiveToPrimitiveType(literalType), false);
            return;
        }
    }


    private static mapLiteralTypeReference(target: any, key: Key, dataValue: any, typeReferenceNode: TypeReferenceNode): void {
        console.log(chalk.greenBright('mapLiteralTypeReferenceeeeee'), target, key, dataValue, typeReferenceNode?.getKindName());
        const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(typeReferenceNode);
        MapDeclarationService.map(target, key, dataValue, typeDeclaration.getName(), typeDeclaration);
        console.log(chalk.greenBright('mapLiteralTypeReferenceeeeee 222'), target, key, dataValue, typeReferenceNode?.getKindName());
    }


    private static async mapArrayType(target: any, key: Key, dataValue: any, arrayTypeNode: ArrayTypeNode): Promise<void> {
        if (isPrimitiveOrPrimitivesArray(arrayTypeNode.getText())) {
            target[key] = MapPrimitiveService.create(dataValue, arrayTypeNode.getText() as PrimitiveType, true);
            return;
        }
        await MapArrayService.map(target, key, dataValue, arrayTypeNode.getText(), getApparentType(arrayTypeNode));
    }


    private static mapPrimitiveKeywordType(target: any, key: Key, dataValue: any, primitiveKeyword: TypeNode): void {
        target[key] = MapPrimitiveService.create(dataValue, primitiveKeyword.getText() as PrimitiveType, false);
    }

}
