import { isPrimitiveTypeNode, isPrimitiveValueWithCorrectType } from '../utils/primitives.util';
import { MapTupleService } from './map-tuple.service';
import { MapArrayService } from './map-array.service';
import { getImportTypeDeclaration } from '../utils/ast-imports.util';
import { PropertyKind } from '../types/property-kind.enum';
import { MapDeclarationService } from './map-declaration.service';
import { MapInterfaceService } from './map-interface.service';
import { PrimitiveType } from '../types/primitives.type';
import { PropertyInfos } from '../types/property-infos.type';
import { throwWarning } from '../utils/errors.util';

export class MapPropertyService<T> {


    static map<T>(target: any, key: string, dataValue: any, propertyInfos: PropertyInfos): void {
        const apparentType: string = propertyInfos.apparentType;
        const propertyType: string = propertyInfos.propertyType;
        if (isPrimitiveTypeNode(propertyType)) {
            this.mapPrimitiveType(target, key, dataValue, propertyType as PrimitiveType);
            return;
        }
        switch (propertyInfos.propertyKind) {
            case PropertyKind.ARRAY:
                MapArrayService.map(target, key, dataValue, propertyType, apparentType);
                return;
            case PropertyKind.TUPLE:
                MapTupleService.map(target, key, dataValue, propertyType, apparentType);
                return;
            case PropertyKind.INTERFACE:
                const value: any = MapInterfaceService.createInterfaces(dataValue, propertyType, false);
                if (value) {
                    target[key] = value;
                }
                return;
            case PropertyKind.PROPERTY_DECLARATION:
            case PropertyKind.PROPERTY_SIGNATURE:
                MapDeclarationService.map(target, key, dataValue, propertyType, getImportTypeDeclaration(apparentType, propertyType));
                break;
            default:
                throwWarning(`Unknown property kind.\nTarget : ${target}\nKey : ${key}\n Data : ${dataValue}\n Property infos : ${propertyInfos}`);
                MapDeclarationService.map(target, key, dataValue, propertyType, getImportTypeDeclaration(apparentType, propertyType));
        }
    }


    private static mapPrimitiveType(target: any, key: string, dataValue: any, typeName: PrimitiveType): void {
        if (isPrimitiveValueWithCorrectType(dataValue, typeName)) {
            target[key] = dataValue;
        }
    }

}
