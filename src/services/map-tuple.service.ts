import { ClassDeclaration, EnumDeclaration, PropertyDeclaration } from 'ts-morph';
import { isPrimitiveValue, isPrimitiveTypeNode } from '../utils/primitives.util';
import { TypeDeclaration } from '../types/class-or-enum-declaration.type';
import { MapInstanceService } from './map-instance.service';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../utils/ast-imports.util';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';

export class MapTupleService<T> {


    static isTupleType(property: PropertyDeclaration): boolean {
        return property.getType().isTuple();
    }


    static setTupleType(target: any, key: string, dataValue: any, stringifiedTupleTypeArray: string, stringifiedApparentTypeArray: string): void {
        const tupleTypeArray: string[] = this.toArray(stringifiedTupleTypeArray);
        const apparentTupleTypeArray: string[] = this.toArray(stringifiedApparentTypeArray);
        if (!Array.isArray(dataValue) || tupleTypeArray.length !== dataValue?.length) {
            return;
        }
        const value: any[] = [];
        for (let i = 0; i < dataValue.length; i++) {
            const mappedElement: any = this.mapTupleElement(dataValue[i], tupleTypeArray[i], apparentTupleTypeArray[i]);
            if (mappedElement) {
                value.push(mappedElement);
            }
        }
        target[key] = value;
    }


    private static mapTupleElement(dataValue: any, tupleType: string, apparentTupleType: string): any {
        if (isPrimitiveTypeNode(apparentTupleType)) {
            if (typeof dataValue === apparentTupleType) {
                return dataValue;
            }
        } else {
            const importArrayDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentTupleType, tupleType);
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(tupleType, getApparentTypeImportDeclarationPath(apparentTupleType), getNumberOfConstructorArguments(importArrayDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                MapInstanceService.mapData(dataValue, instance, importArrayDeclaration);
                return instance;
            }
            if (importArrayDeclaration instanceof EnumDeclaration && isPrimitiveValue(dataValue)) {
                return dataValue;
            }
        }
        return;
    }


    private static toArray(arrayLike: string): string[] {
        return arrayLike.slice(1, -1).split(', ');
    }

}
