import { ClassDeclaration, EnumDeclaration, PropertyDeclaration, TupleTypeNode } from 'ts-morph';
import { hasPrimitiveType, isPrimitiveType } from '../utils/primitives.util';
import { getImportDeclaration, isEnumValue } from '../utils/ast.util';
import { ClassOrEnumDeclaration } from '../types/class-or-enum-declaration.type';
import { MapTupleService } from './map-tuple.service';
import { MapArrayService } from './map-array.service';
import * as chalk from 'chalk';
import { generateInstance } from '../utils/generate-instance';
import { InstanceGenerator } from '../models/instance-generator.model';

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
        const instanceGenerator = new InstanceGenerator<T>(className, classDeclaration.getSourceFile().getFilePath());
        const instance: T = generateInstance(instanceGenerator);
        this.mapData(data, instance, classDeclaration);
        return instance;
    }


    static mapData<T>(data: any, instance: T, classDeclaration: ClassDeclaration): void {
        for (const key of Object.keys(data)) {
            this.mapDataKey(instance, classDeclaration, key, data[key]);
        }
    }


    private static mapDataKey<T>(target: any, classDeclaration: ClassDeclaration, key: string, dataValue: any): void {
        const property: PropertyDeclaration = classDeclaration.getProperties().find(p => p.getName() === key);
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
            MapTupleService.setTupleType(target, key, dataValue, propertyType, apparentType, property.getTypeNode() as TupleTypeNode);
            return;
        }
        const declaration: ClassOrEnumDeclaration = getImportDeclaration(apparentType, propertyType);
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
        const instanceGenerator = new InstanceGenerator<any>(propertyType, classDeclaration.getSourceFile().getFilePath());
        target[key] = generateInstance(instanceGenerator);
        // target[key] = generateInstance(propertyType);
        this.mapData(dataValue, target[key], classDeclaration);
    }

}
