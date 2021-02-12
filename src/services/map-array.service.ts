import { ClassDeclaration, EnumDeclaration, PropertyDeclaration } from 'ts-morph';
import { hasPrimitiveType } from '../utils/primitives.util';
import {
    getApparentTypeImportDeclarationPath,
    getImportDeclaration,
    getNumberOfConstructorArguments
} from '../utils/ast.util';
import { ClassOrEnumDeclaration } from '../types/class-or-enum-declaration.type';
import { MapInstanceService } from './map-instance.service';
import { generateInstance } from '../utils/generate-instance';
import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';

export class MapArrayService<T> {



    static isArrayType(property: PropertyDeclaration): boolean {
        return property.getType().isArray();
    }


    static setArrayType(target: any, key: string, dataValue: any, propertyType: string, apparentType: string): void {
        if (!Array.isArray(dataValue)) {
            return;
        }
        const typeName: string = propertyType.slice(0, -2);
        const importArrayDeclaration: ClassOrEnumDeclaration = getImportDeclaration(apparentType, typeName);
        target[key] = [] as any[];
        for (const element of dataValue) {
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(typeName, getApparentTypeImportDeclarationPath(apparentType), getNumberOfConstructorArguments(importArrayDeclaration));
                const instance = generateInstance(instanceGenerator);
                MapInstanceService.mapData(element, instance, importArrayDeclaration);
                target[key].push(instance);
            }
            if (importArrayDeclaration instanceof EnumDeclaration && hasPrimitiveType(element)) {
                target[key].push(element);
            }
        }
    }

}
