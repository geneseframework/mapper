import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import * as chalk from 'chalk';
import { MapPropertyService } from './map-property.service';
import { getApparentType } from '../utils/ast-types.util';
import { PropertyKind } from '../types/property-kind.enum';
import { MapArrayService } from './map-array.service';
import { MapTupleService } from './map-tuple.service';
import { getAllInterfaceProperties, implementsRequiredProperties } from '../utils/ast-interfaces.util';
import { PropertyDeclarationOrSignature } from '../types/property-declaration-or-signature.type';

export class MapInterfaceService {


    static createInterfaces<T>(data: any[], interfaceName: string, isArray: boolean): T[]
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T | T[] {
        console.log(chalk.blueBright(''), data, interfaceName, isArray);
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(interfaceName) as InterfaceDeclaration;
        if (Array.isArray(data) && isArray) {
            return this.createInterfacesArray(data, interfaceDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createInterface(data, interfaceDeclaration);
        } else {
            return undefined;
        }
    }


    private static createInterfacesArray<T>(data: any[], interfaceDeclaration: InterfaceDeclaration): T[] {
        const interfacesArray: T[] = [];
        for (const element of data) {
            const value: T = this.createInterface(element, interfaceDeclaration);
            interfacesArray.push(value);
        }
        return interfacesArray;
    }


    private static createInterface<T>(data: any, interfaceDeclaration: InterfaceDeclaration): T {
        const tInterface = {};
        this.mapData(data, tInterface, interfaceDeclaration);
        console.log(chalk.greenBright('MAP INTERFFFFFF ROOOOOT'), tInterface);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }


    static mapData<T>(data: any, tInterface: T, interfaceDeclaration: InterfaceDeclaration): void {
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
        MapPropertyService.map(target, key, dataValue, this.getPropertyKind(property), propertyType, apparentType);
    }


    private static getPropertyKind(property: PropertyDeclarationOrSignature): PropertyKind {
        if (MapArrayService.isArrayType(property)) {
            return PropertyKind.ARRAY_TYPE;
        } else if (MapTupleService.isTupleType(property)) {
            return PropertyKind.TUPLE_TYPE;
        }
    }


    // static mapInterfaceType(target: any, key: string, dataValue: any, interfaceDeclaration: InterfaceDeclaration): void {
    //     console.log(chalk.blueBright('MAP INTERFFFFFF TYPE'), target, key, dataValue, interfaceDeclaration?.getName());
    //     const property: PropertyDeclaration = getAllClassProperties(classDeclaration).find(p => p.getName() === key);
    //     if (!property) {
    //         return;
    //     }
    //     const propertyStructureType: string = property.getStructure().type as string;
    //     const apparentType: string = getApparentType(property).toLowerCase();
    //     const propertyType: string = propertyStructureType ?? apparentType;
    //     target[key] = MapPropertyService.map(target, key, dataValue, undefined, interfaceDeclaration.getName(), undefined);
    //     // target[key] = MapDeclarationService.map(target, interfaceDeclaration.getName(), key, dataValue, interfaceDeclaration);
    //     console.log(chalk.blueBright('MAP INTERFFFFFF target[key]'), target[key]);
    // }

}
