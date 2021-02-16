import { ClassDeclaration, InterfaceDeclaration, Type } from 'ts-morph';
import { getAllClassProperties } from '../utils/ast-class.util';
import { getApparentType } from '../utils/ast-types.util';
import { PropertyKind } from '../types/property-kind.enum';
import { MapPropertyService } from './map-property.service';
import { PropertyDeclarationOrSignature } from '../types/property-declaration-or-signature.type';
import { ClassOrInterfaceDeclaration } from '../types/class-or-interface-declaration.type';
import { MapInterfaceService } from './map-interface.service';
import { getAllInterfaceProperties } from '../utils/ast-interfaces.util';
import { MapInstanceService } from './map-instance.service';

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
    }$


    static map<T>(data: any, target: T, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration): void {
        for (const key of Object.keys(data)) {
            this.mapDataKey(target, classOrInterfaceDeclaration, key, data[key]);
        }
    }


    private static mapDataKey<T>(target: any, classOrInterfaceDeclaration: ClassOrInterfaceDeclaration, key: string, dataValue: any): void {
        const properties: PropertyDeclarationOrSignature[] = classOrInterfaceDeclaration instanceof ClassDeclaration ? getAllClassProperties(classOrInterfaceDeclaration) : getAllInterfaceProperties(classOrInterfaceDeclaration);
        const property: PropertyDeclarationOrSignature = properties.find(p => p.getName() === key);
        if (!property) {
            return;
        }
        const propertyStructureType: string = property.getStructure().type as string;
        const apparentType: string = getApparentType(property).toLowerCase();
        const propertyType: string = propertyStructureType ?? apparentType;
        MapPropertyService.map(target, key, dataValue, this.getPropertyKind(property), propertyType, apparentType);
    }


    static getPropertyKind(property: PropertyDeclarationOrSignature): PropertyKind {
        const propertyType: Type = property.getType();
        if (propertyType.isArray()) {
            return PropertyKind.ARRAY;
        } else if (propertyType.isTuple()) {
            return PropertyKind.TUPLE;
        } else if (propertyType.isInterface()) {
            return PropertyKind.INTERFACE
        }
        return undefined;
    }

}
