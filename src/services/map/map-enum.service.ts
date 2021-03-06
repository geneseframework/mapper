import { EnumDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { isEnumValue } from '../../utils/ast/ast-enums.util';
import { Key } from '../../types/key.type';
import { newMappedElement } from '../../utils/mapping.util';
import { isArray } from '../../utils/native/arrays.util';
import { isBracketed } from '../../types/target/string/bracketed.type';

export class MapEnumService {


    // TODO: check if we need options
    static async create<T>(target: string, data: any): Promise<T | T[]> {
        const enumDeclaration: EnumDeclaration = getTypeDeclaration(target) as EnumDeclaration;
        if (isArray(data) && isBracketed(target)) {
            return await this.createEnumsArray(data, enumDeclaration);
        } else if (!isArray(data) && !isBracketed(target)) {
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
