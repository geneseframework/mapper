import { ClassDeclaration, PropertyDeclaration, Type } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getAllClassProperties, getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { getApparentType } from '../utils/ast-types.util';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { PropertyDeclarationOrSignature } from '../types/property-declaration-or-signature.type';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { PropertyKind } from '../types/property-kind.enum';
import { MapPropertyService } from './map-property.service';

export class MapInstanceService<T> {


    static createInstances<T>(data: any[], className: string): T[] | string[] | number[] | boolean[]
    static createInstances<T>(data: any, className: string): T
    static createInstances<T>(data: any, className: string): T |T[] | string | string[] | number | number[] | boolean | boolean[] {
        const classDeclaration: ClassDeclaration = getTypeDeclaration(className) as ClassDeclaration;
        return Array.isArray(data) ? MapInstanceOrInterfaceService.createArray(data, classDeclaration, className) : this.createInstance<T>(data, className, classDeclaration);
    }


    static createInstance<T>(data: any, className: string, classDeclaration: ClassDeclaration): T {
        const instanceGenerator = new InstanceGenerator<T>(className, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        const instance: T = GLOBAL.generateInstance(instanceGenerator);
        MapInstanceOrInterfaceService.map(data, instance, classDeclaration);
        return instance;
    }
    //
    //
    // static map<T>(data: any, instance: T, classDeclaration: ClassDeclaration): void {
    //     for (const key of Object.keys(data)) {
    //         this.mapDataKey(instance, classDeclaration, key, data[key]);
    //     }
    // }
    //
    //
    // private static mapDataKey<T>(target: any, classDeclaration: ClassDeclaration, key: string, dataValue: any): void {
    //     const property: PropertyDeclaration = getAllClassProperties(classDeclaration).find(p => p.getName() === key);
    //     if (!property) {
    //         return;
    //     }
    //     const propertyStructureType: string = property.getStructure().type as string;
    //     const apparentType: string = getApparentType(property).toLowerCase();
    //     const propertyType: string = propertyStructureType ?? apparentType;
    //     MapPropertyService.map(target, key, dataValue, this.getPropertyKind(property), propertyType, apparentType);
    // }
    //
    //
    // static getPropertyKind(property: PropertyDeclarationOrSignature): PropertyKind {
    //     const propertyType: Type = property.getType();
    //     if (propertyType.isArray()) {
    //         return PropertyKind.ARRAY;
    //     } else if (propertyType.isTuple()) {
    //         return PropertyKind.TUPLE;
    //     } else if (propertyType.isInterface()) {
    //         return PropertyKind.INTERFACE
    //     }
    //     return undefined;
    // }



    // private static getPropertyKind(property: PropertyDeclaration): PropertyKind {
    //     if (MapArrayService.isArrayType(property)) {
    //         return PropertyKind.ARRAY;
    //     } else if (MapTupleService.isTupleType(property)) {
    //         return PropertyKind.TUPLE;
    //     }
    //     return undefined;
    // }

}
