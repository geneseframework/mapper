import { EnumDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { isEnumValue } from '../utils/ast.util';
import { DeclarationService } from './declaration.service';

export class MapEnumService {


    static createEnums<T>(data: any[], typeName: string, isArray: boolean): T[]
    static createEnums<T>(data: any, typeName: string, isArray: boolean): T
    static createEnums<T>(data: any, typeName: string, isArray: boolean): T | T[] {
        return undefined;
    }


    static mapEnumType(target: any, key: string, dataValue: any, declaration: EnumDeclaration): void {
        if (isEnumValue(declaration, dataValue)) {
            target[key] = dataValue;
        }
    }

}
