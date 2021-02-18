import { ClassDeclaration, EnumDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../utils/ast-imports.util';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isEnumValue } from '../utils/ast-enums.util';
import { isEmptyArray } from '../utils/arrays.util';
import * as chalk from 'chalk';
import { primitiveTypes } from '../types/primitives.type';
import { isPrimitiveValue } from '../utils/primitives.util';

export class MapArrayService<T> {


    static map(target: any, key: string, dataValue: any, propertyType: string, apparentType: string): void {
        if (!Array.isArray(dataValue)) {
            return;
        } else if (isEmptyArray(dataValue)) {
            target[key] = [];
            return;
        } else {
            this.mapArray(target, key, dataValue, propertyType, apparentType);
        }
    }


    private static mapArray(target: any, key: string, dataValue: any, propertyType: string, apparentType: string): void {
        const typeName: string = propertyType.slice(0, -2);
        const typeDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentType, typeName);
        for (const element of dataValue) {
            if (typeDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(typeName, getApparentTypeImportDeclarationPath(apparentType), getNumberOfConstructorArguments(typeDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                MapInstanceOrInterfaceService.map(element, instance, typeDeclaration);
                this.push(target, key, instance);
            } else if (this.isPrimitiveOrEnumWithCorrectValue(typeDeclaration, element, typeName)) {
                this.push(target, key, element);
            } else {
                // No correspondance between element and property type => do nothing
            }
        }
    }


    private static isPrimitiveOrEnumWithCorrectValue(declaration: TypeDeclaration, element: any, typeName: string): boolean {
        return this.isEnumWithCorrectValue(declaration, element) || this.isPrimitiveWithCorrectValue(typeName, element);
    }


    private static isEnumWithCorrectValue(declaration: TypeDeclaration, element: any): boolean {
        return declaration instanceof EnumDeclaration && isEnumValue(declaration, element);
    }


    private static isPrimitiveWithCorrectValue(typeName: string, element: any): boolean {
        return primitiveTypes.includes(typeName) && isPrimitiveValue(element);
    }


    private static push(target: any, key: string, element: any): void {
        target[key] = target[key] ?? [] as any[];
        target[key].push(element);
    }

}
