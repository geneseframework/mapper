import { LiteralTypeNode, SyntaxKind, TypeAliasDeclaration, TypeNode, UnionTypeNode } from 'ts-morph';
import { MapPrimitiveService } from './map-primitive.service';
import { isPrimitiveType, literalPrimitiveToPrimitiveType, primitiveLiteralValue } from '../utils/primitives.util';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { TypeDeclaration } from '../types/class-or-enum-declaration.type';
import * as chalk from 'chalk';
import { MapInstanceService } from './map-instance.service';

export class MapTypeService {

    // TODO : Types which are not unions
    static mapTypeType(target: any, key: string, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): void {
        console.log(chalk.magentaBright('TYPE ALIASSSSSS'), key, typeAliasDeclaration.getTypeNode().getKindName())
        this.mapTypeNode(target, key, dataValue, typeAliasDeclaration.getTypeNode());
    }


    static mapTypeNode(target: any, key: string, dataValue: any, typeNode: TypeNode) {
        switch (typeNode.getKind()) {
            case SyntaxKind.UnionType:
                const unionTypeNode = typeNode as UnionTypeNode
                for (const tNode of unionTypeNode.getTypeNodes()) {
                    console.log(chalk.cyanBright('TYPE ????'), key, tNode.getKindName(), tNode.getText());
                    this.mapTypeNode(target, key, dataValue, tNode);
                }
                break;
            case SyntaxKind.LiteralType:
                this.setLiteralTypes(target, key, dataValue, typeNode as LiteralTypeNode);
                break;
            default:
                console.log(chalk.redBright('UNKNOWN TYPENODE TYPE'), typeNode.getKindName());
        }
        // this.setLiteralTypes(target, key, dataValue, typeAliasDeclaration);
        // this.setLiteralTypeReferences(target, key, dataValue, typeAliasDeclaration);
    }


    private static setLiteralTypes(target: any, key: string, dataValue: any, literalType: LiteralTypeNode): void {
        // console.log(chalk.blueBright('SET LITERAL TYPPPPP'), key, dataValue);
        if (isPrimitiveType(literalType) && primitiveLiteralValue(literalType) === dataValue) {
            target[key] = MapPrimitiveService.create(dataValue, literalPrimitiveToPrimitiveType(literalType));
            return;
        }
        // TODO : Literal objects, true, false, null,...
    }


    // private static setLiteralTypes(target: any, key: string, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): void {
    //     // console.log(chalk.blueBright('SET LITERAL TYPPPPP'), key, dataValue);
    //     for (const literalType of typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.LiteralType)) {
    //         if (isPrimitiveType(literalType) && primitiveLiteralValue(literalType) === dataValue) {
    //             target[key] = MapPrimitiveService.create(dataValue, literalPrimitiveToPrimitiveType(literalType));
    //             return;
    //         }
    //         // TODO : Literal objects, true, false, null,...
    //     }
    // }


    private static setLiteralTypeReferences(target: any, key: string, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): void {
        for (const literalType of typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.TypeReference)) {
            const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(literalType);
            MapInstanceService.mapTypeDeclaration(typeDeclaration, target, typeDeclaration.getName(), key, dataValue);
        }
    }

}
