import { ClassDeclaration, SyntaxKind, TypeAliasDeclaration } from 'ts-morph';
import * as chalk from 'chalk';
import { MapPrimitiveService } from './map-primitive.service';
import {
    isLiteralTypeReference,
    isPrimitiveType,
    literalPrimitiveToPrimitiveType,
    primitiveLiteralValue
} from '../utils/primitives.util';
import { getClassDeclaration } from '../utils/ast-class.util';
import { MapInstanceService } from './map-instance.service';

export class MapTypeService {

    // TODO : Types which are not unions
    static setTypeType(target: any, key: string, dataValue: any, propertyType: string, typeAliasDeclaration: TypeAliasDeclaration): void {
        this.setLiteralTypes(target, key, dataValue, propertyType, typeAliasDeclaration);
        this.setLiteralTypeReferences(target, key, dataValue, propertyType, typeAliasDeclaration);
    }


    private static setLiteralTypes(target: any, key: string, dataValue: any, propertyType: string, typeAliasDeclaration: TypeAliasDeclaration): void {
        for (const literalType of typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.LiteralType)) {
            if (isPrimitiveType(literalType) && primitiveLiteralValue(literalType) === dataValue) {
                target[key] = MapPrimitiveService.create(dataValue, literalPrimitiveToPrimitiveType(literalType));
                return;
            }
            // TODO : Literal objects, true, false, null,...
        }
    }


    private static setLiteralTypeReferences(target: any, key: string, dataValue: any, propertyType: string, typeAliasDeclaration: TypeAliasDeclaration): void {
        for (const literalType of typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.TypeReference)) {
            // console.log(chalk.cyanBright('TYPE REFFFFFF'), key, dataValue, propertyType);
            const classDeclaration: ClassDeclaration = getClassDeclaration(literalType);
            // const zzz = MapInstanceService.createInstance(dataValue, literalType.getText(), classDeclaration);
            // console.log(chalk.magentaBright('ZZZZZ TREF'), zzz);
        }
    }

}
