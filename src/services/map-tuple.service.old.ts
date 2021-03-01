import { ClassDeclaration, EnumDeclaration } from 'ts-morph';
import { isPrimitiveTypeNode, isPrimitiveValue } from '../utils/primitives.util';
import { TypeDeclaration } from '../types/type-declaration.type';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../utils/ast-imports.util';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { Tuple } from '../types/tuples/tuple.type';
import { Mapper } from '../models/mapper';
import { CreateOptions } from '../interfaces/create-options.interface';

export class MapTupleServiceOld<T> {


    static async create(data: any[], mapParameterTuple: Tuple, options: CreateOptions): Promise<Tuple> {
        const tuple: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === undefined) {
                tuple.push(data[i]);
            } else {
                const mappedElement: any = await Mapper.create(mapParameterTuple[i], data[i], options); // TODO: Error ?
                if (mappedElement !== undefined) {
                    tuple.push(mappedElement);
                } else {
                    return undefined;
                }
            }
        }
        return tuple.length > 0 ? tuple : undefined;
    }


    static map(target: any, key: string, dataValue: any, stringifiedTupleTypeArray: string, stringifiedApparentTypeArray: string, options: CreateOptions): void {
        const tupleTypeArray: string[] = this.toArray(stringifiedTupleTypeArray);
        const apparentTupleTypeArray: string[] = this.toArray(stringifiedApparentTypeArray);
        if (!Array.isArray(dataValue) || tupleTypeArray.length !== dataValue?.length) {
            return;
        }
        const value: any[] = [];
        for (let i = 0; i < dataValue.length; i++) {
            const mappedElement: any = this.mapTupleElement(dataValue[i], tupleTypeArray[i], apparentTupleTypeArray[i], options);
            if (mappedElement) {
                value.push(mappedElement);
            }
        }
        target[key] = value;
    }


    private static mapTupleElement(dataValue: any, tupleType: string, apparentTupleType: string, options: CreateOptions): any {
        if (isPrimitiveTypeNode(apparentTupleType)) {
            if (typeof dataValue === apparentTupleType) {
                return dataValue;
            }
        } else {
            const importArrayDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentTupleType, tupleType);
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(tupleType, getApparentTypeImportDeclarationPath(apparentTupleType), getNumberOfConstructorArguments(importArrayDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                MapInstanceOrInterfaceService.map(instance, dataValue, importArrayDeclaration, options);
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
