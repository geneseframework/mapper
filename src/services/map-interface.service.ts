import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import * as chalk from 'chalk';
import { MapPropertyService } from './map-property.service';
import { getApparentType } from '../utils/ast-types.util';
import { getAllInterfaceProperties, implementsRequiredProperties } from '../utils/ast-interfaces.util';
import { PropertyDeclarationOrSignature } from '../types/property-declaration-or-signature.type';
import { MapInstanceService } from './map-instance.service';

export class MapInterfaceService {


    static createInterfaces<T>(data: any[], interfaceName: string, isArray: boolean): T[]
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T | T[] {
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(interfaceName) as InterfaceDeclaration;
        if (Array.isArray(data) && isArray) {
            return this.createInterfacesArray(data, interfaceDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createInterface(data, interfaceDeclaration);
        } else {
            return undefined;
        }
    }


    static createInterfacesArray<T>(data: any[], interfaceDeclaration: InterfaceDeclaration): T[] {
        const interfacesArray: T[] = [];
        for (const element of data) {
            const value: T = this.createInterface(element, interfaceDeclaration);
            interfacesArray.push(value);
        }
        return interfacesArray;
    }


    static createInterface<T>(data: any, interfaceDeclaration: InterfaceDeclaration): T {
        const tInterface = {};
        this.map(data, tInterface, interfaceDeclaration);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }


    static map<T>(data: any, tInterface: T, interfaceDeclaration: InterfaceDeclaration): void {
        for (const key of Object.keys(data)) {
            this.mapDataKey(tInterface, interfaceDeclaration, key, data[key]);
        }
    }


    private static mapDataKey<T>(target: any, interfaceDeclaration: InterfaceDeclaration, key: string, dataValue: any): void {
        const property: PropertyDeclarationOrSignature = getAllInterfaceProperties(interfaceDeclaration).find(p => p.getName() === key);
        if (!property) {
            return;
        }
        const propertyStructureType: string = property.getStructure().type as string;
        const apparentType: string = getApparentType(property).toLowerCase();
        const propertyType: string = propertyStructureType ?? apparentType;
        MapPropertyService.map(target, key, dataValue, MapInstanceService.getPropertyKind(property), propertyType, apparentType);
    }

}
