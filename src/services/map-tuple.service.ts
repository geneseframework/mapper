import { ClassDeclaration, EnumDeclaration, PropertyDeclaration, TupleTypeNode } from 'ts-morph';
import { hasPrimitiveType, isPrimitiveType } from '../utils/primitives.util';
import { getApparentTypeImportDeclarationPath, getImportDeclaration } from '../utils/ast.util';
import { ClassOrEnumDeclaration } from '../types/class-or-enum-declaration.type';
import { MapInstanceService } from './map-instance.service';
import { generateInstance } from '../utils/generate-instance';
import { InstanceGenerator } from '../models/instance-generator.model';

export class MapTupleService<T> {


    static isTupleType(property: PropertyDeclaration): boolean {
        return property.getType().isTuple();
    }


    static setTupleType(target: any, key: string, dataValue: any, stringifiedTupleTypeArray: string, stringifiedApparentTypeArray: string, tupleTypeNode: TupleTypeNode): void {
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
        if (isPrimitiveType(apparentTupleType)) {
            if (typeof dataValue === apparentTupleType) {
                return dataValue;
            }
        } else {
            const importArrayDeclaration: ClassOrEnumDeclaration = getImportDeclaration(apparentTupleType, tupleType);
            if (importArrayDeclaration instanceof ClassDeclaration) {
                const instanceGenerator = new InstanceGenerator(tupleType, getApparentTypeImportDeclarationPath(apparentTupleType));
                const instance = generateInstance(instanceGenerator);
                MapInstanceService.mapData(dataValue, instance, importArrayDeclaration);
                return instance;
            }
            if (importArrayDeclaration instanceof EnumDeclaration && hasPrimitiveType(dataValue)) {
                return dataValue;
            }
        }
        return;
    }


    private static toArray(arrayLike: string): string[] {
        return arrayLike.slice(1, -1).split(', ');
    }

}
