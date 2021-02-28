import { EnumDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { isEnumValue } from '../utils/ast-enums.util';
import { Key } from '../types/key.type';
import { newMappedElement } from '../utils/mapping.util';

export class MapEnumService {


    static async create<T>(data: any[], enumName: string, isArray: boolean): Promise<T[]>
    static async create<T>(data: any, enumName: string, isArray: boolean): Promise<T>
    static async create<T>(data: any, enumName: string, isArray: boolean): Promise<T | T[]> {
        const enumDeclaration: EnumDeclaration = getTypeDeclaration(enumName) as EnumDeclaration;
        if (Array.isArray(data) && isArray) {
            return await this.createEnumsArray(data, enumDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return await this.createEnum(data, enumDeclaration);
        } else {
            return undefined;
        }
    }


    private static async createEnumsArray<T>(data: any[], enumDeclaration: EnumDeclaration): Promise<T[]> {
        const enumsArray: T[] = [];
        for (const element of data) {
            const value: T = await this.createEnum(element, enumDeclaration);
            enumsArray.push(value);
        }
        return enumsArray;
    }


    private static async createEnum<T>(data: any, enumDeclaration: EnumDeclaration): Promise<T> {
        return await newMappedElement(this.map, data, enumDeclaration);
    }


    static async map(target: any, key: Key, dataValue: any, declaration: EnumDeclaration): Promise<void> {
        if (isEnumValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }

}
