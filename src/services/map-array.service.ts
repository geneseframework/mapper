import { ClassDeclaration, EnumDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../utils/ast-imports.util';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isEnumValue } from '../utils/ast-enums.util';
import { isEmptyArray } from '../utils/arrays.util';
import { PrimitiveType } from '../types/primitives.type';
import { isPrimitiveValueWithCorrectType, isPrimitiveTypeName } from '../utils/primitives.util';
import { isNullOrUndefined } from '../utils/any.util';
import { Key } from '../types/key.type';
import { ClassOrInterfaceDeclaration } from '../types/class-or-interface-declaration.type';
import { CreateOptions } from '../interfaces/create-options.interface';

export class MapArrayService<T> {


    static async map(target: any, key: Key, dataValue: any, propertyType: string, apparentType: string, options: CreateOptions): Promise<void> {
        if (!Array.isArray(dataValue)) {
            return;
        } else if (isEmptyArray(dataValue)) {
            target[key] = [];
            return;
        } else {
            await this.mapArray(target, key, dataValue, propertyType, apparentType, options);
        }
    }


    private static async mapArray(target: any, key: Key, dataValue: any, propertyType: string, apparentType: string, options: CreateOptions): Promise<void> {
        const typeName: string = propertyType.slice(0, -2);
        const typeDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentType, typeName);
        for (const element of dataValue) {
            if (typeDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(typeName, getApparentTypeImportDeclarationPath(apparentType), getNumberOfConstructorArguments(typeDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                await MapInstanceOrInterfaceService.map(instance, element, typeDeclaration, options);
                this.push(target, key, instance);
            } else if (this.isPrimitiveOrEnumWithCorrectValue(typeDeclaration, element, typeName, options)) {
                this.push(target, key, element);
            } else {
                // No correspondance between element and property type => do nothing
            }
        }
    }


    private static isPrimitiveOrEnumWithCorrectValue(declaration: TypeDeclaration, element: any, typeName: string, options: CreateOptions): boolean {
        return this.isEnumWithCorrectValue(declaration, element) || this.isPrimitiveWithCorrectValue(typeName, element, options) || isNullOrUndefined(element);
    }


    private static isEnumWithCorrectValue(declaration: TypeDeclaration, element: any): boolean {
        return declaration instanceof EnumDeclaration && isEnumValue(declaration, element);
    }


    private static isPrimitiveWithCorrectValue(typeName: string, element: any, options: CreateOptions): boolean {
        return isPrimitiveTypeName(typeName) && isPrimitiveValueWithCorrectType(element, typeName as PrimitiveType, options.differentiateStringsAndNumbers);
    }


    private static push(target: any, key: Key, element: any): void {
        target[key] = target[key] ?? [] as any[];
        target[key].push(element);
    }

}
