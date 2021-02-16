import { ClassDeclaration, EnumDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { isEnumValue } from '../utils/ast.util';
import { DeclarationService } from './declaration.service';
import { getTypeDeclaration } from '../utils/declaration.util';

export class MapEnumService {


    static createEnums<T>(data: any[], enumName: string, isArray: boolean): T[]
    static createEnums<T>(data: any, enumName: string, isArray: boolean): T
    static createEnums<T>(data: any, enumName: string, isArray: boolean): T | T[] {
        const enumDeclaration: EnumDeclaration = getTypeDeclaration(enumName) as EnumDeclaration;
        // return Array.isArray(data) ? this.createInstanceArray(data, enumName, enumDeclaration) : this.createInstance<T>(data, enumName, enumDeclaration);
        return undefined;
    }


    static mapEnumType(target: any, key: string, dataValue: any, declaration: EnumDeclaration): void {
        if (isEnumValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }

}
