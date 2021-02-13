import { SyntaxKind, TypeAliasDeclaration } from 'ts-morph';
import * as chalk from 'chalk';
import { MapPrimitiveService } from './map-primitive.service';
import { isPrimitiveType, literalPrimitiveToPrimitiveType, primitiveLiteralValue } from '../utils/primitives.util';

export class MapTypeService {

    static setTypeType(target: any, key: string, dataValue: any, propertyType: string, typeAliasDeclaration: TypeAliasDeclaration): void {
        this.setLiteralTypes(target, key, dataValue, propertyType, typeAliasDeclaration);
    }


    private static setLiteralTypes(target: any, key: string, dataValue: any, propertyType: string, typeAliasDeclaration: TypeAliasDeclaration): void {
        for (const literalType of typeAliasDeclaration.getDescendantsOfKind(SyntaxKind.LiteralType)) {
            if (isPrimitiveType(literalType)) {
                // console.log(chalk.greenBright('Literal .????'), target);
                // console.log(chalk.greenBright('Literal .????'), key, dataValue, propertyType, primitiveLiteralValue(literalType));
                if (primitiveLiteralValue(literalType) === dataValue) {
                    target[key] = MapPrimitiveService.create(dataValue, literalPrimitiveToPrimitiveType(literalType));
                    // console.log(chalk.cyanBright('ZZZ .????'), zzz);
                }
            }
        }
    }

}
