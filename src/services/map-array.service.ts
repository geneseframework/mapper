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
        console.log(chalk.magentaBright('MAPPPPPP ARRAY'), target, key, dataValue, propertyType, apparentType);
        const typeName: string = propertyType.slice(0, -2);
        const importArrayDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentType, typeName);
        for (const element of dataValue) {
            console.log(chalk.yellowBright('MAPPPPPP ARRAY'), target, key, dataValue, propertyType, apparentType, element, primitiveTypes.includes(propertyType), isPrimitiveValue(element));
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(typeName, getApparentTypeImportDeclarationPath(apparentType), getNumberOfConstructorArguments(importArrayDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                MapInstanceOrInterfaceService.map(element, instance, importArrayDeclaration);
                this.push(target, key, instance);
            } else if (importArrayDeclaration instanceof EnumDeclaration && isEnumValue(importArrayDeclaration, element)) {
                this.push(target, key, element);
            } else if (primitiveTypes.includes(typeName) && isPrimitiveValue(element)) {
                this.push(target, key, element);
            } else {
                console.log(chalk.redBright('No correspondance between element and property type : '), target, key, dataValue, propertyType, apparentType);
            }
        }
    }


    private static push(target: any, key: string, element: any): void {
        target[key] = target[key] ?? [] as any[];
        target[key].push(element);
    }

}
