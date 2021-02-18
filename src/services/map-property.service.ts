import { isPrimitiveTypeNode, isPrimitiveValueWithCorrectType } from '../utils/primitives.util';
import { MapTupleService } from './map-tuple.service';
import { MapArrayService } from './map-array.service';
import { getImportTypeDeclaration } from '../utils/ast-imports.util';
import { PropertyKind } from '../types/property-kind.enum';
import { MapDeclarationService } from './map-declaration.service';
import { MapInterfaceService } from './map-interface.service';
import * as chalk from 'chalk';
import { PrimitiveType } from '../types/primitives.type';

export class MapPropertyService<T> {


    static map<T>(target: any, key: string, dataValue: any, propertyKind: PropertyKind, propertyType: string, apparentType: string): void {
        if (isPrimitiveTypeNode(propertyType)) {
            this.mapPrimitiveType(target, key, dataValue, propertyType as PrimitiveType);
            return;
        }
        switch (propertyKind) {
            case PropertyKind.ARRAY:
                MapArrayService.map(target, key, dataValue, propertyType, apparentType);
                return;
            case PropertyKind.TUPLE:
                MapTupleService.map(target, key, dataValue, propertyType, apparentType);
                return;
            case PropertyKind.INTERFACE:
                target[key] = MapInterfaceService.createInterfaces(dataValue, propertyType, false);
                return;
            case PropertyKind.PROPERTY_DECLARATION:
            case PropertyKind.PROPERTY_SIGNATURE:
                MapDeclarationService.map(target, key, dataValue, propertyType, getImportTypeDeclaration(apparentType, propertyType));
                break;
            default:
                console.log(chalk.redBright('Unknown property kind : '), target, key, dataValue, propertyKind, propertyType);
                MapDeclarationService.map(target, key, dataValue, propertyType, getImportTypeDeclaration(apparentType, propertyType));
        }
    }


    private static mapPrimitiveType(target: any, key: string, dataValue: any, typeName: PrimitiveType): void {
        if (isPrimitiveValueWithCorrectType(dataValue, typeName)) {
            target[key] = dataValue;
        }
    }

}
