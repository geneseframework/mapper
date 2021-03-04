import { MapTupleServiceOld } from './map-tuple.service.old';
import { MapArrayService } from './map-array.service';
import { getImportTypeDeclaration } from '../../utils/ast/ast-imports.util';
import { PropertyKind } from '../../enums/property-kind.enum';
import { MapDeclarationService } from './map-declaration.service';
import { MapInterfaceService } from './map-interface.service';
import { PrimitiveType } from '../../types/primitives.type';
import { PropertyInfos } from '../../types/property-infos.type';
import { throwWarning } from '../../utils/errors.util';
import { CreateOptions } from '../../models/create-options.model';
import { isPrimitiveTypeNode, isNonNullPrimitiveValueWithCorrectType } from '../../utils/native/primitives.util';
import * as chalk from 'chalk';

export class MapPropertyService<T> {


    static async map<T>(target: any, key: string, dataValue: any, propertyInfos: PropertyInfos, options: CreateOptions): Promise<void> {
        const apparentType: string = propertyInfos.apparentType;
        const propertyType: string = propertyInfos.propertyType;
        // console.log(chalk.blueBright('MAP PROPPPP'), target, key, dataValue, propertyInfos);
        if (isPrimitiveTypeNode(propertyType)) {
            this.mapPrimitiveType(target, key, dataValue, propertyType as PrimitiveType, options);
            return;
        }
        switch (propertyInfos.propertyKind) {
            case PropertyKind.ARRAY:
                await MapArrayService.map(target, key, dataValue, propertyType, apparentType, options);
                return;
            case PropertyKind.TUPLE:
                MapTupleServiceOld.map(target, key, dataValue, propertyType, apparentType, options);
                return;
            case PropertyKind.INTERFACE:
                await this.mapInterfaceProperty(target, key, dataValue, propertyType, options);
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


    private static mapPrimitiveType(target: any, key: string, dataValue: any, primitiveType: PrimitiveType, options: CreateOptions): void {
        if (isNonNullPrimitiveValueWithCorrectType(primitiveType, dataValue, options.differentiateStringsAndNumbers)) {
            target[key] = dataValue;
        }
    }


    private static async mapInterfaceProperty(target: any, key: string, dataValue: any, propertyType: string, options: CreateOptions): Promise<void> {
        const newInterface: object = await MapInterfaceService.create(dataValue, propertyType, false, options);
        this.addDefaultValues(target, key, newInterface);
        if (newInterface) {
            target[key] = newInterface;
        }
    }


    private static addDefaultValues(target: any, key: string, newInterface: any): void {
        if (!target[key]) {
            return;
        }
        for (const property of Object.keys(target[key])) {
            if (!newInterface.hasOwnProperty(property)) {
                newInterface[property] = target[key][property];
            }
        }
    }

}
