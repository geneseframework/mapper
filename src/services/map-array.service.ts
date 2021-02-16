import { ClassDeclaration, EnumDeclaration, PropertyDeclaration } from 'ts-morph';
import { isPrimitiveValue } from '../utils/primitives.util';
import { TypeDeclaration } from '../types/class-or-enum-declaration.type';
import { MapInstanceService } from './map-instance.service';
import { GLOBAL } from '../const/global.const';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../utils/ast-imports.util';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import * as chalk from 'chalk';
import { MapEnumService } from './map-enum.service';

export class MapArrayService<T> {



    static isArrayType(property: PropertyDeclaration): boolean {
        return property.getType().isArray();
    }


    static mapArrayType(target: any, key: string, dataValue: any, propertyType: string, apparentType: string): void {
        if (!Array.isArray(dataValue)) {
            return;
        }
        const typeName: string = propertyType.slice(0, -2);
        const importArrayDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentType, typeName);
        target[key] = [] as any[];
        for (const element of dataValue) {
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(typeName, getApparentTypeImportDeclarationPath(apparentType), getNumberOfConstructorArguments(importArrayDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                MapInstanceService.mapData(element, instance, importArrayDeclaration);
                target[key].push(instance);
            }
            if (importArrayDeclaration instanceof EnumDeclaration) {
                MapEnumService.mapEnumType(target, key, element, importArrayDeclaration)
            }
        }
    }

}
