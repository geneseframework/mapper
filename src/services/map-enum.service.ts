import { EnumDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { isEnumValue } from '../utils/ast-enums.util';
import { Key } from '../types/key.type';
import { newMappedElement } from '../utils/mapping.util';

export class MapEnumService {


    static createEnums<T>(data: any[], enumName: string, isArray: boolean): T[]
    static createEnums<T>(data: any, enumName: string, isArray: boolean): T
    static createEnums<T>(data: any, enumName: string, isArray: boolean): T | T[] {
        const enumDeclaration: EnumDeclaration = getTypeDeclaration(enumName) as EnumDeclaration;
        if (Array.isArray(data) && isArray) {
            return this.createEnumsArray(data, enumDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createEnum(data, enumDeclaration);
        } else {
            return undefined;
        }
    }


    private static createEnumsArray<T>(data: any[], enumDeclaration: EnumDeclaration): T[] {
        const enumsArray: T[] = [];
        for (const element of data) {
            const value: T = this.createEnum(element, enumDeclaration);
            enumsArray.push(value);
        }
        return enumsArray;
    }


    private static createEnum<T>(data: any, enumDeclaration: EnumDeclaration): T {
        return newMappedElement(this.map, data, enumDeclaration);
    }


    static map(target: any, key: Key, dataValue: any, declaration: EnumDeclaration): void {
        if (isEnumValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }

}
