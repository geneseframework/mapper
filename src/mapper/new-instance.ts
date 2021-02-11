import {
    ClassDeclaration,
    EnumDeclaration,
    NamedTupleMember,
    PropertyDeclaration,
    TupleTypeNode,
    TypeNode
} from 'ts-morph';
import * as chalk from 'chalk';
import { hasPrimitiveType, isPrimitiveType } from '../utils/primitives.util';
import { getImportDeclaration, isEnumValue } from '../utils/ast.util';
import { ClassOrEnumDeclaration } from '../types/class-or-enum-declaration.type';
import { createInstance } from '../debug/project/create-instance';

export class InstanceService<T> {


    static newInstances<T>(data: any[], className: string, classDeclaration: ClassDeclaration): T[] {
        const instancesArray: T[] = [];
        for (const element of data) {
            const instance: T = this.newInstance(element, className, classDeclaration);
            instancesArray.push(instance);
        }
        return instancesArray;
    }


    static newInstance<T>(data: any, className: string, classDeclaration: ClassDeclaration): T {
        const instance: T = createInstance(className);
        this.mapData(data, instance, classDeclaration);
        return instance;
    }


    private static mapData<T>(data: any, instance: T, classDeclaration: ClassDeclaration): void {
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
        if (this.isArrayType(property)) {
            this.setArrayType(target, key, dataValue, propertyType, apparentType);
            return;
        }
        if (this.isTupleType(property)) {
            this.setTupleType(target, key, dataValue, propertyType, apparentType, property.getTypeNode() as TupleTypeNode);
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


    private static setClassType(target: any, key: string, dataValue: any, propertyType: string, declaration: ClassDeclaration): void {
        target[key] = createInstance(propertyType);
        this.mapData(dataValue, target[key], declaration);
    }


    private static isArrayType(property: PropertyDeclaration): boolean {
        return property.getType().isArray();
    }


    private static setArrayType(target: any, key: string, dataValue: any, propertyType: string, apparentType: string): void {
        if (!Array.isArray(dataValue)) {
            return;
        }
        const typeName: string = propertyType.slice(0, -2);
        const importArrayDeclaration: ClassOrEnumDeclaration = getImportDeclaration(apparentType, typeName);
        target[key] = [] as any[];
        for (const element of dataValue) {
            const instance = createInstance(typeName);
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const mapped = this.mapData(element, instance, importArrayDeclaration);
                target[key].push(mapped);
            }
            if (importArrayDeclaration instanceof EnumDeclaration && hasPrimitiveType(element)) {
                target[key].push(element);
            }
        }
    }


    private static isTupleType(property: PropertyDeclaration): boolean {
        return property.getType().isTuple();
    }



    private static setTupleType(target: any, key: string, dataValue: any, propertyType: string, apparentType: string, tupleTypeNode: TupleTypeNode): void {
        const tupleElements: (TypeNode | NamedTupleMember)[] = tupleTypeNode?.getElements();
        const tupleType: string[] = this.toArray(propertyType);
        const apparentTupleType: string[] = this.toArray(apparentType);
        if (!Array.isArray(dataValue) || tupleElements.length !== dataValue?.length) {
            return;
        }
        const value: any[] = [];
        for (let i = 0; i < dataValue.length; i++) {
            if (isPrimitiveType(apparentTupleType[i])) {
                if (typeof dataValue[i] === apparentTupleType[i]) {
                    value.push(dataValue[i]);
                } else {
                    return;
                }
            } else {
                const instance = createInstance(tupleType[i]);
                const importArrayDeclaration: ClassOrEnumDeclaration = getImportDeclaration(apparentTupleType[i], tupleType[i]);
                if (importArrayDeclaration instanceof ClassDeclaration) {
                    const mapped = this.mapData(dataValue[i], instance, importArrayDeclaration);
                    value.push(mapped);
                }
                if (importArrayDeclaration instanceof EnumDeclaration && hasPrimitiveType(dataValue[i])) {
                    value.push(dataValue[i]);
                }

            }
        }
        target[key] = value;
    }


    private static toArray(arrayLike: string): string[] {
        return arrayLike.slice(1, -1).split(', ');
    }

}
