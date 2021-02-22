import { ClassDeclaration, InterfaceDeclaration, SyntaxKind, Type } from 'ts-morph';
import { getAllClassProperties } from '../utils/ast-class.util';
import { getApparentType } from '../utils/ast-types.util';
import { PropertyKind } from '../types/property-kind.enum';
import { MapPropertyService } from './map-property.service';
import { PropertyDeclarationOrSignature } from '../types/property-declaration-or-signature.type';
import { ClassOrInterfaceDeclaration } from '../types/class-or-interface-declaration.type';
import { MapInterfaceService } from './map-interface.service';
import { getAllInterfaceProperties } from '../utils/ast-interfaces.util';
import { MapInstanceService } from './map-instance.service';
import * as chalk from 'chalk';
import { isAny, isAnyArray, isAnyOrAnyArray, keyExistsButIsNullOrUndefined } from '../utils/any.util';
import { isArray } from '../utils/arrays.util';
import { indexSignatureWithSameType } from '../utils/ast-declaration.util';
import { PropertyInfos } from '../types/property-infos.type';
import { DateDeclaration } from '../models/date-declaration.model';

export class MapInstanceOrInterfaceService<T> {


    static createArray<T>(data: any[], dateDeclaration: DateDeclaration): Date[]
    static createArray<T>(data: any[], interfaceDeclaration: InterfaceDeclaration): T[]
    static createArray<T>(data: any[], classDeclaration: ClassDeclaration, className: string): T[] | string[] | number[] | boolean[]
    static createArray<T>(data: any[], classOrInterfaceDeclaration: ClassOrInterfaceDeclaration, classOrInterfaceName?: string): T[] | string[] | number[] | boolean[] | Date | Date[] {
        const instancesArray: T[] | Date[] = [];
        for (const element of data) {
            const instance: any = classOrInterfaceDeclaration instanceof ClassDeclaration ? MapInstanceService.createInstance(element, classOrInterfaceName, classOrInterfaceDeclaration) : MapInterfaceService.createInterface(data, classOrInterfaceDeclaration) ;
            instancesArray.push(instance);
        }
        return instancesArray;
    }


    static async map<T>(target: T, data: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): Promise<void> {
        for (const key of Object.keys(data)) {
            if (keyExistsButIsNullOrUndefined(data, key)) {
                target[key] = data[key];
            } else {
                await this.mapDataKey(target, key, data[key], classOrInterfaceDeclaration);
            }
        }
        console.log(chalk.blueBright('END OF MAP INST OR INTERFFFFFF'), target, data, classOrInterfaceDeclaration?.getName());
    }


    private static async mapDataKey<T>(target: any, key: string, dataValue: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): Promise<void> {
        const properties: PropertyDeclarationOrSignature[] = classOrInterfaceDeclaration instanceof ClassDeclaration ? getAllClassProperties(classOrInterfaceDeclaration) : getAllInterfaceProperties(classOrInterfaceDeclaration);
        const property: PropertyDeclarationOrSignature = properties.find(p => p.getName() === key);
        console.log(chalk.magentaBright('MAP DATA KKKKKK'), target, key, dataValue, classOrInterfaceDeclaration?.getName());
        if (this.keyIsIncompatibleWithDeclarationType(property, key, dataValue, classOrInterfaceDeclaration)) {
            return;
        }
        const propertyInfos: PropertyInfos = property ? this.getPropertyInfos(property) : this.getPropertyInfosWithIndexSignature(key, dataValue, classOrInterfaceDeclaration);
        if (isAnyOrAnyArray(propertyInfos.propertyType)) {
            this.mapAny(target, key, dataValue, propertyInfos.propertyType);
        } else {
            await MapPropertyService.map(target, key, dataValue, propertyInfos);
        }
    }


    private static keyIsIncompatibleWithDeclarationType(property: PropertyDeclarationOrSignature, key: string, dataValue: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): boolean {
        return !property && !indexSignatureWithSameType(key, dataValue, classOrInterfaceDeclaration);
    }


    private static getPropertyInfos(property: PropertyDeclarationOrSignature): PropertyInfos {
        const propertyStructureType: string = property.getStructure().type as string ?? 'any';
        const apparentType = getApparentType(property).toLowerCase();
        const propertyType = propertyStructureType ?? apparentType;
        return new PropertyInfos(apparentType, propertyType, this.getPropertyKind(property));
    }


    private static getPropertyInfosWithIndexSignature(key: string, dataValue: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): PropertyInfos {
        const propertyName: string = indexSignatureWithSameType(key, dataValue, classOrInterfaceDeclaration);
        return new PropertyInfos(undefined, propertyName, PropertyKind.PROPERTY_DECLARATION);
    }


    private static mapAny(target: any, key: string, dataValue: any, typeName: string): void {
        if (isAny(typeName) || (isAnyArray(typeName) && isArray(dataValue)) || typeName === undefined) {
            target[key] = dataValue;
        }
    }


    static getPropertyKind(property: PropertyDeclarationOrSignature): PropertyKind {
        const propertyType: Type = property.getType();
        if (propertyType.isArray()) {
            return PropertyKind.ARRAY;
        } else if (propertyType.isTuple()) {
            return PropertyKind.TUPLE;
        } else if (propertyType.isInterface()) {
            return PropertyKind.INTERFACE
        } else if (property.getKind() === SyntaxKind.PropertyDeclaration) {
            return PropertyKind.PROPERTY_DECLARATION;
        } else if (property.getKind() === SyntaxKind.PropertySignature) {
            return PropertyKind.PROPERTY_SIGNATURE;
        } else {
            console.log(chalk.redBright('Unknown property kind :'), property.getKindName());
            return undefined;
        }
    }

}
