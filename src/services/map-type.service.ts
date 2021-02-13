import {
    LiteralExpression,
    LiteralLikeNode,
    LiteralTypeNode,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeReferenceNode
} from 'ts-morph';
import * as chalk from 'chalk';
import { TypeDeclarationNode } from '../types/type-nodes.type';
import { MapPrimitiveService } from './map-primitive.service';
import { PrimitiveType, TLiteral } from '../types/primitives.type';
import { isPrimitiveType, literalToPrimitive } from '../utils/primitives.util';

export class MapTypeService {

    static setTypeType(target: any, key: string, dataValue: any, propertyType: string, typeAliasDeclaration: TypeAliasDeclaration): void {
        console.log(chalk.blueBright('setTypeTypeeeeeee'), key, dataValue);
        this.setLiteralTypes(target, key, dataValue, propertyType, typeAliasDeclaration);
        // const typeDeclarationNodes: TypeDeclarationNode[] = this.getAllTypes(typeAliasDeclaration);
        // console.log(chalk.cyanBright('setTypeTypeeeeeee'), typeAliasDeclaration.getType().getUnionTypes());
    }


    // private static getAllTypes(typeAliasDeclaration: TypeAliasDeclaration): TypeDeclarationNode[] {
    //     return typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.LiteralType | SyntaxKind.TypeReference)
    //     const typeDeclarationNodes: TypeDeclarationNode[] = [];
    //     return typeDeclarationNodes;
    // }


    private static setLiteralTypes(target: any, key: string, dataValue: any, propertyType: string, typeAliasDeclaration: TypeAliasDeclaration): void {
        for (const literalType of typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.LiteralType)) {
            // const zzz: string = literalType;
            // const literal: TLiteral = literalToPrimitive(literalType);
            if (isPrimitiveType(literalType)) {
                console.log(chalk.greenBright('Literal .????'), key, dataValue);
            }
            // literal.getKindName()
            // this.setLiteralType(target, key, dataValue, propertyType, literalType);
            // const zzz = MapPrimitiveService.create(dataValue, typeName);
        }
    }


    private static setLiteralType(target: any, key: string, dataValue: any, propertyType: string, literalType: LiteralTypeNode): void {
        console.log(chalk.greenBright('Literal   Typeeeeeee'), literalType.getLiteral().getKindName());
        switch (literalType.getLiteral().getKind()) {
            case SyntaxKind.StringLiteral:

        }
    }

}
