import { isPrimitiveTypeNode, isPrimitiveValue } from '../utils/primitives.util';
import { MapTupleService } from './map-tuple.service';
import { MapArrayService } from './map-array.service';
import { getImportTypeDeclaration } from '../utils/ast-imports.util';
import { PropertyKind } from '../types/property-kind.enum';
import { MapDeclarationService } from './map-declaration.service';
import { MapInterfaceService } from './map-interface.service';
import * as chalk from 'chalk';

export class MapPropertyService<T> {


    static map<T>(target: any, key: string, dataValue: any, propertyKind: PropertyKind, propertyType: string, apparentType: string): void {
        if (isPrimitiveTypeNode(propertyType)) {
            this.mapPrimitiveType(target, key, dataValue);
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
                MapDeclarationService.map(target, propertyType, key, dataValue, getImportTypeDeclaration(apparentType, propertyType));
                break;
            default:
                MapDeclarationService.map(target, propertyType, key, dataValue, getImportTypeDeclaration(apparentType, propertyType));
        }
    }


    private static mapPrimitiveType(target: any, key: string, dataValue: any): void {
        if (isPrimitiveValue(dataValue)) {
            target[key] = dataValue;
        }
    }

}
