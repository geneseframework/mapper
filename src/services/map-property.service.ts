import { isPrimitiveTypeNode, isPrimitiveValueWithCorrectType } from '../utils/primitives.util';
import { MapTupleService } from './map-tuple.service';
import { MapArrayService } from './map-array.service';
import { getImportTypeDeclaration } from '../utils/ast-imports.util';
import { PropertyKind } from '../enums/property-kind.enum';
import { MapDeclarationService } from './map-declaration.service';
import { MapInterfaceService } from './map-interface.service';
import { PrimitiveType } from '../types/primitives.type';
import { PropertyInfos } from '../types/property-infos.type';
import { throwWarning } from '../utils/errors.util';
import * as chalk from 'chalk';
import { ClassOrInterfaceDeclaration } from '../types/class-or-interface-declaration.type';
import { CreateOptions } from '../interfaces/create-options.interface';

export class MapPropertyService<T> {


    static async map<T>(target: any, key: string, dataValue: any, propertyInfos: PropertyInfos, options: CreateOptions): Promise<void> {
        const apparentType: string = propertyInfos.apparentType;
        const propertyType: string = propertyInfos.propertyType;
        if (isPrimitiveTypeNode(propertyType)) {
            this.mapPrimitiveType(target, key, dataValue, propertyType as PrimitiveType, options);
            return;
        }
        switch (propertyInfos.propertyKind) {
            case PropertyKind.ARRAY:
                await MapArrayService.map(target, key, dataValue, propertyType, apparentType, options);
                return;
            case PropertyKind.TUPLE:
                MapTupleService.map(target, key, dataValue, propertyType, apparentType, options);
                return;
            case PropertyKind.INTERFACE:
                const value: any = await MapInterfaceService.createInterfaces(dataValue, propertyType, false, options);
                if (value) {
                    target[key] = value;
                }
                return;
            case PropertyKind.PROPERTY_DECLARATION:
            case PropertyKind.PROPERTY_SIGNATURE:
                await MapDeclarationService.map(target, key, dataValue, propertyType, getImportTypeDeclaration(apparentType, propertyType), options);
                break;
            default:
                throwWarning(`Unknown property kind.\nTarget : ${target}\nKey : ${key}\n Data : ${dataValue}\n Property infos : ${propertyInfos}`);
                await MapDeclarationService.map(target, key, dataValue, propertyType, getImportTypeDeclaration(apparentType, propertyType), options);
        }
    }


    private static mapPrimitiveType(target: any, key: string, dataValue: any, typeName: PrimitiveType, options: CreateOptions): void {
        if (isPrimitiveValueWithCorrectType(dataValue, typeName, options.differentiateStringsAndNumbers)) {
            target[key] = dataValue;
        }
    }

}
