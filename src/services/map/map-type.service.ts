import {
    ArrayTypeNode,
    LiteralTypeNode,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeNode,
    TypeReferenceNode,
    UnionTypeNode
} from 'ts-morph';
import { MapPrimitiveServiceOld } from './map-primitive.service.old';
import * as chalk from 'chalk';
import { PrimitiveType } from '../../types/primitives.type';
import { MapArrayService } from './map-array.service';
import { getTypeReferenceTypeDeclaration } from '../../utils/ast/ast-class.util';
import { getApparentType } from '../../utils/ast/ast-types.util';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { TypeDeclaration } from '../../types/type-declaration.type';
import { MapDeclarationService } from './map-declaration.service';
import { newMappedElement } from '../../utils/mapping.util';
import { MapTypeArrayService } from './map-type-array.service';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { Key } from '../../types/key.type';
import { IncompatibilityService } from '../incompatibility.service';
import { CreateOptions } from '../../interfaces/create-options.interface';
import {
    isPrimitiveOrPrimitivesArray,
    isPrimitiveTypeNode,
    literalPrimitiveToPrimitiveType,
    primitiveLiteralValue
} from '../../utils/native/primitives.util';

export class MapTypeService {


    static async create<T>(data: any[], typeName: string, isArray: boolean, options: CreateOptions): Promise<T[]>
    static async create<T>(data: any, typeName: string, isArray: boolean, options: CreateOptions): Promise<T>
    static async create<T>(data: any, typeName: string, isArray: boolean, options: CreateOptions): Promise<T | T[]> {
        const typeAliasDeclaration: TypeAliasDeclaration = getTypeDeclaration(typeName) as TypeAliasDeclaration;
        if (Array.isArray(data) && isArray) {
            return this.createTypesArray(data, typeAliasDeclaration, options);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createType(data, typeAliasDeclaration, options);
        } else {
            return undefined;
        }
    }


    private static async createTypesArray<T>(data: any[], typeAliasDeclaration: TypeAliasDeclaration, options: CreateOptions): Promise<T[]> {
        const typesArray: T[] = [];
        for (const element of data) {
            const instance: T = await this.mapData<T>(element, typeAliasDeclaration, options);
            typesArray.push(instance);
        }
        return typesArray;
    }


    private static async createType<T>(data: any, typeAliasDeclaration: TypeAliasDeclaration, options: CreateOptions): Promise<T> {
        return await this.mapData<T>(data, typeAliasDeclaration, options);
    }


    private static async mapData<T>(dataValue: any, typeAliasDeclaration: TypeAliasDeclaration, options: CreateOptions): Promise<T> {
        return await newMappedElement(this.map, dataValue, typeAliasDeclaration, options);
    }


    static async map(target: any, key: Key, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration, options: CreateOptions): Promise<void> {
        await MapTypeService.mapTypeNode(target, key, dataValue, typeAliasDeclaration.getTypeNode(), options);
    }


    static async mapTypeNode(target: any, key: Key, dataValue: any, typeNode: TypeNode, options: CreateOptions): Promise<void> {
        if (IncompatibilityService.isIncompatibleWithTypeNode(dataValue, typeNode)) {
            return;
        }
        if (isNullOrUndefined(dataValue)) {
            target[key] = dataValue;
            return;
        }
        // console.log(chalk.blueBright('MAP TYPE NODDDDD'), target, key, dataValue, typeNode.getKindName(), options);
        switch (typeNode.getKind()) {
            case SyntaxKind.UnionType:
                await this.mapUnionType(target, key, dataValue, typeNode as UnionTypeNode, options);
                break;
            case SyntaxKind.TypeReference:
                await this.mapTypeReference(target, key, dataValue, typeNode as TypeReferenceNode, options);
                break;
            case SyntaxKind.LiteralType:
                this.mapLiteralType(target, key, dataValue, typeNode as LiteralTypeNode, options);
                break;
            case SyntaxKind.StringKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BooleanKeyword:
                this.mapPrimitiveKeywordType(target, key, dataValue, typeNode, options);
                break;
            case SyntaxKind.ArrayType:
                await this.mapArrayType(target, key, dataValue, typeNode as ArrayTypeNode, options);
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
     * @param options
     * @private
     */
    private static async mapUnionType(target: any, key: Key, dataValue: any, unionTypeNode: UnionTypeNode, options: CreateOptions): Promise<void> {
        await MapTypeArrayService.mapTypeNodesArray(target, key, dataValue, unionTypeNode.getTypeNodes(), [], options);
    }


    private static mapLiteralType(target: any, key: Key, dataValue: any, literalType: LiteralTypeNode, options: CreateOptions): void {
        if (isPrimitiveTypeNode(literalType) && primitiveLiteralValue(literalType) === dataValue) {
            target[key] = MapPrimitiveServiceOld.create(dataValue, literalPrimitiveToPrimitiveType(literalType), false, options);
            return;
        }
    }


    private static async mapTypeReference(target: any, key: Key, dataValue: any, typeReferenceNode: TypeReferenceNode, options: CreateOptions): Promise<void> {
        if (IncompatibilityService.isIncompatibleWithTypeNode(dataValue, typeReferenceNode)) {
            return undefined;
        }
        const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(typeReferenceNode);
        await MapDeclarationService.map(target, key, dataValue, typeDeclaration?.getName(), typeDeclaration, options);
    }


    private static async mapArrayType(target: any, key: Key, dataValue: any, arrayTypeNode: ArrayTypeNode, options: CreateOptions): Promise<void> {
        if (isPrimitiveOrPrimitivesArray(arrayTypeNode.getText())) {
            target[key] = MapPrimitiveServiceOld.create(dataValue, arrayTypeNode.getText() as PrimitiveType, true, options);
            return;
        }
        await MapArrayService.map(target, key, dataValue, arrayTypeNode.getText(), getApparentType(arrayTypeNode), options);
    }


    private static mapPrimitiveKeywordType(target: any, key: Key, dataValue: any, primitiveKeyword: TypeNode, options: CreateOptions): void {
        target[key] = MapPrimitiveServiceOld.create(dataValue, primitiveKeyword.getText() as PrimitiveType, false, options);
    }

}
