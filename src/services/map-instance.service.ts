import { ClassDeclaration, EnumDeclaration, PropertyDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { isPrimitiveTypeNode, isPrimitiveValue } from '../utils/primitives.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapTupleService } from './map-tuple.service';
import { MapArrayService } from './map-array.service';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { MapTypeService } from './map-type.service';
import { getAllProperties, getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { getImportTypeDeclaration } from '../utils/ast-imports.util';
import { getApparentType } from '../utils/ast-types.util';
import { DeclarationService } from './declaration.service';
import { MapEnumService } from './map-enum.service';
import * as chalk from 'chalk';

export class MapInstanceService<T> {


    static createInstances<T>(data: any[], className: string, isArray: boolean): T[] | string[] | number[] | boolean[]
    static createInstances<T>(data: any, className: string, isArray: boolean): T
    static createInstances<T>(data: any, className: string, isArray: boolean): T |T[] | string | string[] | number | number[] | boolean | boolean[] {
        if (className === 'EmployerSpec' && isArray) {
            console.log(chalk.redBright('CLASS NAMEEEEE'), className);
        }
        const classDeclaration: ClassDeclaration = DeclarationService.getDeclaration(className, 'ClassDeclaration');
        return Array.isArray(data) ? this.createInstanceArray(data, className, classDeclaration) : this.createInstance<T>(data, className, classDeclaration);
    }


    private static createInstance<T>(data: any, className: string, classDeclaration: ClassDeclaration): T {
        const instanceGenerator = new InstanceGenerator<T>(className, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        const instance: T = GLOBAL.generateInstance(instanceGenerator);
        this.mapData(data, instance, classDeclaration);
        return instance;
    }


    private static createInstanceArray<T>(data: any, className: string, classDeclaration: ClassDeclaration): T[] | string[] | number[] | boolean[] {
        const instancesArray: T[] = [];
        for (const element of data) {
            const instance: T = this.createInstance(element, className, classDeclaration);
            instancesArray.push(instance);
        }
        return instancesArray;
    }


    static mapData<T>(data: any, instance: T, classDeclaration: ClassDeclaration): void {
        for (const key of Object.keys(data)) {
            this.mapDataKey(instance, classDeclaration, key, data[key]);
        }
    }


    private static mapDataKey<T>(target: any, classDeclaration: ClassDeclaration, key: string, dataValue: any): void {
        const property: PropertyDeclaration = getAllProperties(classDeclaration).find(p => p.getName() === key);
        if (!property) {
            return;
        }
        const propertyStructureType: string = property.getStructure().type as string;
        const apparentType: string = getApparentType(property).toLowerCase();
        const propertyType: string = propertyStructureType ?? apparentType;
        if (isPrimitiveTypeNode(propertyType)) {
            this.mapPrimitiveType(target, key, dataValue);
            return;
        }
        if (MapArrayService.isArrayType(property)) {
            MapArrayService.mapArrayType(target, key, dataValue, propertyType, apparentType);
            return;
        }
        if (MapTupleService.isTupleType(property)) {
            MapTupleService.mapTupleType(target, key, dataValue, propertyType, apparentType);
            return;
        }
        this.mapTypeDeclaration(getImportTypeDeclaration(apparentType, propertyType), target, propertyType, key, dataValue);
    }


    static mapTypeDeclaration(typeDeclaration: TypeDeclaration, target: any, propertyType: string, key: string, dataValue: any): void {
        if (!typeDeclaration) {
            return;
        }
        if (typeDeclaration instanceof ClassDeclaration) {
            this.mapClassType(target, key, dataValue, propertyType, typeDeclaration);
            return;
        }
        if (typeDeclaration instanceof EnumDeclaration) {
            MapEnumService.mapEnumType(target, key, dataValue, typeDeclaration);
            return;
        }
        if (typeDeclaration instanceof TypeAliasDeclaration)
        {
            MapTypeService.mapTypeType(target, key, dataValue, typeDeclaration);
            return;
        }
    }


    private static mapPrimitiveType(target: any, key: string, dataValue: any): void {
        if (isPrimitiveValue(dataValue)) {
            target[key] = dataValue;
        }
    }


    private static mapClassType(target: any, key: string, dataValue: any, propertyType: string, classDeclaration: ClassDeclaration): void {
        const instanceGenerator = new InstanceGenerator<any>(propertyType, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        target[key] = GLOBAL.generateInstance(instanceGenerator);
        this.mapData(dataValue, target[key], classDeclaration);
    }

}
