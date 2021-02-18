import { ClassDeclaration, EnumDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../utils/ast-imports.util';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isEnumValue } from '../utils/ast-enums.util';
import { isEmptyArray } from '../utils/arrays.util';

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
        const importArrayDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentType, typeName);
        for (const element of dataValue) {
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(typeName, getApparentTypeImportDeclarationPath(apparentType), getNumberOfConstructorArguments(importArrayDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                MapInstanceOrInterfaceService.map(element, instance, importArrayDeclaration);
                this.push(target, key, instance);
            }
            if (importArrayDeclaration instanceof EnumDeclaration && isEnumValue(importArrayDeclaration, element)) {
                this.push(target, key, element);
            }
        }
    }


    private static push(target: any, key: string, element: any): void {
        target[key] = target[key] ?? [] as any[];
        target[key].push(element);
    }

}
