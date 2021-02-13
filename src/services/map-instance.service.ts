import { ClassDeclaration, EnumDeclaration, PropertyDeclaration, TupleTypeNode, TypeAliasDeclaration } from 'ts-morph';
import { hasPrimitiveType, isPrimitiveType } from '../utils/primitives.util';
import {
    getAllProperties,
    getImportDeclaration,
    getNumberOfConstructorArguments,
    isEnumValue
} from '../utils/ast.util';
import { TypeDeclaration } from '../types/class-or-enum-declaration.type';
import { MapTupleService } from './map-tuple.service';
import { MapArrayService } from './map-array.service';
import { GLOBAL } from '../const/global.const';
import * as chalk from 'chalk';
import { InstanceGenerator } from '../models/instance-generator.model';
import { MapTypeService } from './map-type.service';

export class MapInstanceService<T> {


    static createInstances<T>(data: any[], className: string, classDeclaration: ClassDeclaration): T[] | string[] | number[] | boolean[] {
        const instancesArray: T[] = [];
        for (const element of data) {
            const instance: T = this.createInstance(element, className, classDeclaration);
            instancesArray.push(instance);
        }
        return instancesArray;
    }


    static createInstance<T>(data: any, className: string, classDeclaration: ClassDeclaration): T {
        const instanceGenerator = new InstanceGenerator<T>(className, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        const instance: T = GLOBAL.generateInstance(instanceGenerator);
        this.mapData(data, instance, classDeclaration);
        return instance;
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
        const apparentType: string = property.getType().getApparentType().getText().toLowerCase();
        const propertyType = propertyStructureType ?? apparentType;
        if (isPrimitiveType(propertyType)) {
            this.setPrimitiveType(target, key, dataValue);
            return;
        }
        if (MapArrayService.isArrayType(property)) {
            MapArrayService.setArrayType(target, key, dataValue, propertyType, apparentType);
            return;
        }
        if (MapTupleService.isTupleType(property)) {
            MapTupleService.setTupleType(target, key, dataValue, propertyType, apparentType);
            return;
        }
        const declaration: TypeDeclaration = getImportDeclaration(apparentType, propertyType);
        if (!declaration) {
            return;
        }
        if (declaration instanceof ClassDeclaration) {
            this.setClassType(target, key, dataValue, propertyType, declaration);
            return;
        }
        if (declaration instanceof EnumDeclaration) {
            this.setEnumType(target, key, dataValue, declaration);
            return;
        }
        if (declaration instanceof TypeAliasDeclaration) {
            MapTypeService.setTypeType(target, key, dataValue, propertyType, declaration);
            return;
        }
    }


    private static setPrimitiveType(target: any, key: string, dataValue: any): void {
        if (hasPrimitiveType(dataValue)) {
            target[key] = dataValue;
        }
    }


    private static setEnumType(target: any, key: string, dataValue: any, declaration: EnumDeclaration): void {
        if (isEnumValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }


    private static setClassType(target: any, key: string, dataValue: any, propertyType: string, classDeclaration: ClassDeclaration): void {
        const instanceGenerator = new InstanceGenerator<any>(propertyType, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        target[key] = GLOBAL.generateInstance(instanceGenerator);
        this.mapData(dataValue, target[key], classDeclaration);
    }

}
