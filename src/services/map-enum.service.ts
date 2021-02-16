import { EnumDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { isEnumValue } from '../utils/ast-enums.util';

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
        const root = { rootKey: undefined };
        this.mapEnumType(root, 'rootKey', data, enumDeclaration);
        return root.rootKey;
    }


    static mapEnumType(target: any, key: string, dataValue: any, declaration: EnumDeclaration): void {
        if (isEnumValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }

}
