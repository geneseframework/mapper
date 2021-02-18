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

export class MapInstanceOrInterfaceService<T> {


    static createArray<T>(data: any, interfaceDeclaration: InterfaceDeclaration): T[]
    static createArray<T>(data: any, classDeclaration: ClassDeclaration, className: string): T[] | string[] | number[] | boolean[]
    static createArray<T>(data: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration, classOrInterfaceName?: string): T[] | string[] | number[] | boolean[] {
        const instancesArray: T[] = [];
        for (const element of data) {
            const instance: T = classOrInterfaceDeclaration instanceof ClassDeclaration ? MapInstanceService.createInstance(element, classOrInterfaceName, classOrInterfaceDeclaration) : MapInterfaceService.createInterface(data, classOrInterfaceDeclaration) ;
            instancesArray.push(instance);
        }
        return instancesArray;
    }


    static map<T>(data: any, target: T, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): void {
        for (const key of Object.keys(data)) {
            if (keyExistsButIsNullOrUndefined(data, key)) {
                target[key] = data[key];
            } else {
                this.mapDataKey(target, key, data[key], classOrInterfaceDeclaration);
            }
        }
    }


    private static mapDataKey<T>(target: any, key: string, dataValue: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): void {
        const properties: PropertyDeclarationOrSignature[] = classOrInterfaceDeclaration instanceof ClassDeclaration ? getAllClassProperties(classOrInterfaceDeclaration) : getAllInterfaceProperties(classOrInterfaceDeclaration);
        const property: PropertyDeclarationOrSignature = properties.find(p => p.getName() === key);
        let apparentType: string;
        let propertyType: string;
        let propertyKind: PropertyKind;
        // TODO : try type = false keyword
        if (this.ketIsIncompatibleWithDeclarationType(property, key, dataValue, classOrInterfaceDeclaration)) {
            return;
        }
        if (!property) {
            const indexSignatureName: string = indexSignatureWithSameType(key, dataValue, classOrInterfaceDeclaration);
            if (indexSignatureName) {
                propertyType = indexSignatureName;
                propertyKind = PropertyKind.PROPERTY_DECLARATION;
            } else {
                return;
            }
        } else {
            const propertyStructureType: string = property.getStructure().type as string ?? 'any';
            apparentType = getApparentType(property).toLowerCase();
            propertyType = propertyStructureType ?? apparentType;
            propertyKind = this.getPropertyKind(property);
        }
        if (isAnyOrAnyArray(propertyType)) {
            this.mapAny(target, key, dataValue, propertyType);
        } else {
            MapPropertyService.map(target, key, dataValue, propertyKind, propertyType, apparentType);
        }
    }


    private static ketIsIncompatibleWithDeclarationType(property: PropertyDeclarationOrSignature, key: string, dataValue: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): boolean {
        return !property && !indexSignatureWithSameType(key, dataValue, classOrInterfaceDeclaration);
    }


    private static mapIndexSignature(target: any, key: string, dataValue: any, indexSignatureName: string): void {
        if (isAnyOrAnyArray(indexSignatureName)) {
            this.mapAny(target, key, dataValue, indexSignatureName);
        } else {
            MapPropertyService.map(target, key, dataValue, PropertyKind.PROPERTY_DECLARATION, indexSignatureName, undefined);
        }
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
