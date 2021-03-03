import { ClassDeclaration, EnumDeclaration } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../../utils/ast/ast-imports.util';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../../utils/ast/ast-class.util';
import { TypeDeclaration } from '../../types/type-declaration.type';
import { MapInstanceOrInterfaceServiceOld } from './map-instance-or-interface.service.old';
import { isEnumValue } from '../../utils/ast/ast-enums.util';
import { isArray, isEmptyArray } from '../../utils/native/arrays.util';
import { PrimitiveType } from '../../types/primitives.type';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { Key } from '../../types/key.type';
import { CreateOptions } from '../../interfaces/create-options.interface';
import { isPrimitiveTypeName } from '../../utils/native/types.util';
import { isNonNullPrimitiveValueWithCorrectType } from '../../utils/native/primitives.util';
import { Mapper } from '../../models/mapper';
import * as chalk from 'chalk';
import { ArrayType, typeOfArray } from '../../types/target/string/array-type.type';

export class MapArrayService<T> {


    static async create(target: ArrayType, data: any, options: CreateOptions): Promise<any[]> {
        if (!isArray(data)) {
            return undefined;
        }
        const arr: any[] = [];
        for (const element of data) {
            if (element === null || element === undefined) {
                arr.push(element);
            } else {
                const mappedElement: any = await Mapper.create(typeOfArray(target), element, options);
                if (mappedElement !== undefined) {
                    arr.push(mappedElement);
                }
            }
        }
        return arr;
    }


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
                await MapInstanceOrInterfaceServiceOld.map(instance, element, typeDeclaration, options);
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
        return isPrimitiveTypeName(typeName) && isNonNullPrimitiveValueWithCorrectType(element, typeName as PrimitiveType, options.differentiateStringsAndNumbers);
    }


    private static push(target: any, key: Key, element: any): void {
        target[key] = target[key] ?? [] as any[];
        target[key].push(element);
    }

}
