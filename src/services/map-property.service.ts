import { isPrimitiveTypeNode, isPrimitiveValue } from '../utils/primitives.util';
import { MapTupleService } from './map-tuple.service';
import { MapArrayService } from './map-array.service';
import { getImportTypeDeclaration } from '../utils/ast-imports.util';
import { PropertyKind } from '../types/property-kind.enum';
import { MapDeclarationService } from './map-declaration.service';

export class MapPropertyService<T> {


    static map<T>(target: any, key: string, dataValue: any, propertyKind: PropertyKind, propertyType: string, apparentType: string): void {
        if (isPrimitiveTypeNode(propertyType)) {
            this.mapPrimitiveType(target, key, dataValue);
            return;
        }
        switch (propertyKind) {
            case PropertyKind.ARRAY_TYPE:
                MapArrayService.map(target, key, dataValue, propertyType, apparentType);
                return;
            case PropertyKind.TUPLE_TYPE:
                MapTupleService.map(target, key, dataValue, propertyType, apparentType);
                return;
            default:
                MapDeclarationService.map(getImportTypeDeclaration(apparentType, propertyType), target, propertyType, key, dataValue);
        }
    }


    private static mapPrimitiveType(target: any, key: string, dataValue: any): void {
        if (isPrimitiveValue(dataValue)) {
            target[key] = dataValue;
        }
    }

}
