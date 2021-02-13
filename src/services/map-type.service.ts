import { SyntaxKind, TypeAliasDeclaration } from 'ts-morph';
import { MapPrimitiveService } from './map-primitive.service';
import { isPrimitiveType, literalPrimitiveToPrimitiveType, primitiveLiteralValue } from '../utils/primitives.util';
import { getTypeReferenceTypeDeclaration } from '../utils/ast-class.util';
import { TypeDeclaration } from '../types/class-or-enum-declaration.type';
import * as chalk from 'chalk';
import { MapInstanceService } from './map-instance.service';

export class MapTypeService {

    // TODO : Types which are not unions
    static setTypeType(target: any, key: string, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): void {
        this.setLiteralTypes(target, key, dataValue, typeAliasDeclaration);
        this.setLiteralTypeReferences(target, key, dataValue, typeAliasDeclaration);
    }


    private static setLiteralTypes(target: any, key: string, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): void {
        for (const literalType of typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.LiteralType)) {
            if (isPrimitiveType(literalType) && primitiveLiteralValue(literalType) === dataValue) {
                target[key] = MapPrimitiveService.create(dataValue, literalPrimitiveToPrimitiveType(literalType));
                return;
            }
            // TODO : Literal objects, true, false, null,...
        }
    }


    private static setLiteralTypeReferences(target: any, key: string, dataValue: any, typeAliasDeclaration: TypeAliasDeclaration): void {
        for (const literalType of typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.TypeReference)) {
            const typeDeclaration: TypeDeclaration = getTypeReferenceTypeDeclaration(literalType);
            MapInstanceService.mapTypeDeclaration(typeDeclaration, target, typeDeclaration.getName(), key, dataValue);
        }
    }

}
