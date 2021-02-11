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
import { MapTupleService } from './map-tuple.service';
import { MapInstanceService } from './map-instance.service';

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
            const instance = createInstance(typeName);
            if (importArrayDeclaration instanceof ClassDeclaration) {
                MapInstanceService.mapData(element, instance, importArrayDeclaration);
                target[key].push(instance);
            }
            if (importArrayDeclaration instanceof EnumDeclaration && hasPrimitiveType(element)) {
                target[key].push(element);
            }
        }
    }

}
