import {
    ArrayTypeNode, ClassDeclaration,
    LiteralTypeNode,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeNode,
    TypeReferenceNode,
    UnionTypeNode
} from 'ts-morph';
import { MapPrimitiveService } from './map-primitive.service';
import {
    isPrimitiveType,
    isPrimitiveTypeOrArrayOfPrimitiveTypes,
    literalPrimitiveToPrimitiveType,
    primitiveLiteralValue
} from '../utils/primitives.util';
import { TypeDeclaration } from '../types/class-or-enum-declaration.type';
import * as chalk from 'chalk';
import { MapInstanceService } from './map-instance.service';
import { PrimitiveType, PrimitiveTypes } from '../types/primitives.type';
import { MapArrayService } from './map-array.service';
import { clone } from '../utils/tools.service';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { getApparentType } from '../utils/ast-types.util';
import { partialArray } from '../utils/arrays.util';

export class MapTypeService {


    static createTypes<T>(data: any[], className: string, typeAliasDeclaration: TypeAliasDeclaration): T[]
    static createTypes<T>(data: any, className: string, typeAliasDeclaration: TypeAliasDeclaration): T
    static createTypes<T>(data: any, className: string, typeAliasDeclaration: TypeAliasDeclaration): T |T[] {
        console.log(chalk.blueBright('CREATE TYPESSSSS'), data);
        console.log(chalk.cyanBright('ALIAS TYPESSSSS'), typeAliasDeclaration);
        if (!Array.isArray(data)) {
            return this.mapData<T>(data, typeAliasDeclaration);
        }
        const instancesArray: T[] = [];
        for (const element of data) {
            // const instance: T = this.createInstance(element, className, classDeclaration);
            // instancesArray.push(instance);
        }
        return instancesArray;
    }


    private static mapData<T>(dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): T {
        const target = {} as T;
        for (const key of Object.keys(dataValue)) {
            this.mapTypeType(target, key, dataValue, typeAliasDeclaration);
        }
        return target;
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
        const initialValue: any = clone(target[key]);
        const keys: string[] = [];
        const unionTypeNodes: TypeNode[] = unionTypeNode.getTypeNodes();
        for (let i = 0; i < unionTypeNodes.length; i++) {
            console.log(chalk.cyanBright('MAP TNODEEEEEE'), key, dataValue, unionTypeNodes[i].getKindName());
            if (this.isKeyType(key, unionTypeNodes[i])) {
                this.mapTypeNode(target, key, dataValue, unionTypeNodes[i]);
                keys.push(key);
            } else {
                const nextTypeNodes: TypeNode[] = partialArray(unionTypeNodes, i);
                const nextTypeNodeIncludingKeys: TypeNode = this.getNextTypeNodeIncludingKeys(keys.concat([key]), nextTypeNodes);
            }
            if (target[key] !== initialValue) {
                break;
            }
        }
    }


    private static isKeyType(keys: string[], typeNode: TypeNode): boolean
    private static isKeyType(key: string, typeNode: TypeNode): boolean
    private static isKeyType(keys: string | string[], typeNode: TypeNode): boolean {
        return true;
    }


    private static getNextTypeNodeIncludingKeys(keys: string[], typeNodes: TypeNode[]): TypeNode {
        for (const typeNode of typeNodes) {
            if (this.isKeyType(keys, typeNode)) {
                return typeNode;
            }
        }
        return undefined;
    }


    private static mapLiteralType(target: any, key: string, dataValue: any, literalType: LiteralTypeNode): void {
        if (isPrimitiveType(literalType) && primitiveLiteralValue(literalType) === dataValue) {
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
        if (isPrimitiveTypeOrArrayOfPrimitiveTypes(arrayTypeNode.getText())) {
            target[key] = MapPrimitiveService.create(dataValue, arrayTypeNode.getText() as PrimitiveTypes);
            return;
        }
        MapArrayService.setArrayType(target, key, dataValue, arrayTypeNode.getText(), getApparentType(arrayTypeNode));
    }


    private static mapPrimitiveKeywordType(target: any, key: string, dataValue: any, primitiveKeyword: TypeNode): void {
        target[key] = MapPrimitiveService.create(dataValue, primitiveKeyword.getText() as PrimitiveType);
    }

}
