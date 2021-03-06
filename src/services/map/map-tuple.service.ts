import { ClassDeclaration, EnumDeclaration } from 'ts-morph';
import { TypeDeclaration } from '../../types/type-declaration.type';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { getApparentTypeImportDeclarationPath, getImportTypeDeclaration } from '../../utils/ast/ast-imports.util';
import { getNumberOfConstructorArguments } from '../../utils/ast/ast-class.util';
import { MapInstanceOrInterfaceServiceOld } from './map-instance-or-interface.service.old';
import { Mapper } from '../../models/mapper';
import { CreateOptions } from '../../models/create-options.model';
import { isNonNullOrPrimitiveValue, isPrimitiveTypeNode } from '../../utils/native/primitives.util';
import { Bracketed } from '../../types/target/string/bracketed.type';
import { getContainerizedElements, isArrayOfSameLength } from '../../utils/target.util';
import { isNullOrUndefined } from '../../utils/native/any.util';

export class MapTupleService<T> {


    static async create(target: Bracketed, data: any, options: CreateOptions): Promise<any[]> {
        if (!isArrayOfSameLength(target, data)) {
            return undefined;
        }
        const tuple: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (isNullOrUndefined(data[i])) {
                tuple.push(data[i]);
            } else {
                tuple.push(await Mapper.create(getContainerizedElements(target)[i], data[i], options));
            }
        }
        return tuple;
    }


    static async map(target: any, key: string, dataValue: any, stringifiedTupleTypeArray: string, stringifiedApparentTypeArray: string, options: CreateOptions): Promise<void> {
        const tupleTypeArray: string[] = this.toArray(stringifiedTupleTypeArray);
        const apparentTupleTypeArray: string[] = this.toArray(stringifiedApparentTypeArray);
        if (!Array.isArray(dataValue) || tupleTypeArray.length !== dataValue?.length) {
            return;
        }
        const value: any[] = [];
        for (let i = 0; i < dataValue.length; i++) {
            const mappedElement: any = await this.mapTupleElement(dataValue[i], tupleTypeArray[i], apparentTupleTypeArray[i], options);
            if (mappedElement) {
                value.push(mappedElement);
            }
        }
        target[key] = value;
    }


    private static async mapTupleElement(dataValue: any, tupleType: string, apparentTupleType: string, options: CreateOptions): Promise<any> {
        if (isPrimitiveTypeNode(apparentTupleType)) {
            if (typeof dataValue === apparentTupleType) {
                return dataValue;
            }
        } else {
            const importArrayDeclaration: TypeDeclaration = getImportTypeDeclaration(apparentTupleType, tupleType);
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(tupleType, getApparentTypeImportDeclarationPath(apparentTupleType), getNumberOfConstructorArguments(importArrayDeclaration));
                const instance = GLOBAL.generateInstance(instanceGenerator);
                await MapInstanceOrInterfaceServiceOld.map(instance, dataValue, importArrayDeclaration, options);
                return instance;
            }
            if (importArrayDeclaration instanceof EnumDeclaration && isNonNullOrPrimitiveValue(dataValue)) {
                return dataValue;
            }
        }
        return;
    }


    private static toArray(arrayLike: string): string[] {
        return arrayLike.slice(1, -1).split(', ');
    }

}
