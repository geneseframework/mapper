import {
    ArrayTypeNode, ClassDeclaration, EnumDeclaration,
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
import { partialClone } from '../utils/arrays.util';

export class MapTypeService {


    static createTypes<T>(data: any[], className: string, typeAliasDeclaration: TypeAliasDeclaration): T[]
    static createTypes<T>(data: any, className: string, typeAliasDeclaration: TypeAliasDeclaration): T
    static createTypes<T>(data: any, className: string, typeAliasDeclaration: TypeAliasDeclaration): T | T[] {
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
        const initialValue: any = clone(target[key]);
        const typeNode: TypeNode = typeNodes[0];
        // const keys: string[] = [];
        // for (let i = 0; i < typeNodes.length; i++) {
        if (key === 'employer') {
            console.log(chalk.greenBright('MAP TNODEEEEEE'), target, key, dataValue, typeProperties, typeNodes.map(n => n.getKindName()));
        }
        for (const dataKey of Object.keys(dataValue)) {
            typeProperties.push(dataKey);
            if (this.isKeyType(dataKey, typeNode)) {
                if (key === 'employer') {
                    console.log(chalk.green('IS KEY TYPPPPPP'), key, dataValue, typeProperties, typeNode?.getKindName());
                }
                this.mapTypeNode(target, key, dataValue, typeNode);
            } else {
                const nextTypeNodes: TypeNode[] = partialClone(typeNodes, 1);
                if (key === 'employer') {
                    console.log(chalk.redBright('NOT IN TYPEEEEEE'), typeProperties, nextTypeNodes.map(n => n.getKindName()));
                }
                const indexOfNextTypeNodeIncludingKeys: number = this.getNextTypeNodeIncludingKeys(typeProperties.concat([dataKey]), nextTypeNodes);
                if (key === 'employer') {
                    console.log(chalk.redBright('indexOfNextTypeNodeIncludingKeyssssss'), indexOfNextTypeNodeIncludingKeys);
                }
                if (indexOfNextTypeNodeIncludingKeys !== undefined) {
                    const nextTypeNodesIncludingKeys: TypeNode[] = nextTypeNodes.slice(indexOfNextTypeNodeIncludingKeys);
                    if (key === 'employer') {
                        console.log(chalk.magentaBright('NEXT TYPENODDDDDDD'), nextTypeNodesIncludingKeys?.map(t => t.getKindName()));
                    }
                    this.mapTypeNodesArray(target, key, dataValue, nextTypeNodesIncludingKeys, typeProperties);
                }
            }
        }
        if (target[key] !== initialValue) {
            // break;
        }
        // }
    }


    private static isKeyType(keys: string[], typeNode: TypeNode): boolean
    private static isKeyType(key: string, typeNode: TypeNode): boolean
    private static isKeyType(keys: string | string[], typeNode: TypeNode): boolean {
        if (Array.isArray(keys)) {
            return keys.every(key => this.isKeyInType(key, typeNode));
        } else {
            return this.isKeyInType(keys, typeNode);
        }

    }


    private static isKeyInType(key: string, typeNode: TypeNode): boolean {
        switch (typeNode.getKind()) {
            case SyntaxKind.TypeReference:
                const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(typeNode as TypeReferenceNode);
                if (typeDeclaration instanceof ClassDeclaration) {
                    if (key.includes('employer')) {
                        console.log(chalk.blueBright('IS KEY IN TYPEEEEE ?'), key, typeDeclaration.getName(), typeDeclaration.getProperties().map(p => p.getName()));
                    }
                    return !!typeDeclaration.getProperties().find(p => p.getName() === key);
                } else  {
                    return false;
                }
            case SyntaxKind.ArrayType:
                // TODO
                return false;
            default:
                console.log(chalk.redBright('Unknown kind of TypeNode : key not found in Type '), typeNode.getKindName());
        }
        return true;
    }


    private static getNextTypeNodeIncludingKeys(properties: string[], typeNodes: TypeNode[]): number {
        if (properties.includes('employer')) {
            console.log(chalk.yellowBright('IS KTYPPPPPP -1111'), properties, typeNodes.map(t => t.getKindName()));
        }
        for (let i = 0; i < typeNodes.length; i++) {
            if (properties.includes('employer')) {
                console.log(chalk.yellowBright('IS KTYPPPPPP 0'), properties, typeNodes[i].getKindName());
            }
            if (this.isKeyType(properties, typeNodes[i])) {
                if (properties.includes('employer')) {
                    console.log(chalk.yellowBright('IS KTYPPPPPP'), properties, typeNodes[i].getKindName());
                }
                return i;
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
