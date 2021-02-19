import { ClassDeclaration, EnumDeclaration } from 'ts-morph';
import { isPrimitiveTypeNode, isPrimitiveValue } from '../utils/primitives.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../utils/ast-imports.util';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType } from '../types/primitives.type';
import { MapParameter } from '../types/map-parameter.type';
import { Tuple } from '../types/tuple.type';
import * as chalk from 'chalk';
import { newMappedElement } from '../utils/mapping.util';
import { Mapper } from '../models/mapper';

export class MapTupleService<T> {



    static async create(data: any[], mapParameterTuple: Tuple): Promise<Tuple> {
        if (!Array.isArray(data) || data?.length !== mapParameterTuple?.length) {
            return undefined;
        }
        const tuple: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === undefined) {
                tuple.push(data[i]);
            } else {
                const mappedElement: any = await Mapper.create(mapParameterTuple[i], data[i]);
                if (mappedElement) {
                    tuple.push(mappedElement);
                } else {
                    return undefined;
                }
            }
        }
        return tuple.length > 0 ? tuple : undefined;
    }


    static map(target: any, key: string, dataValue: any, stringifiedTupleTypeArray: string, stringifiedApparentTypeArray: string): void {
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
                MapInstanceOrInterfaceService.map(instance, dataValue, importArrayDeclaration);
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
