import { EnumDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { isEnumValue } from '../../utils/ast/ast-enums.util';
import { StringOrNumber } from '../../types/string-or-number.type';
import { newMappedElement } from '../../utils/mapping.util';
import { isArray } from '../../utils/native/arrays.util';
import { isBracketed } from '../../types/target/string/bracketed.type';
import * as chalk from 'chalk';
import { GLOBAL } from '../../const/global.const';
import { TypeInfo } from '../../models/declarations/type-info.model';
import { EnumInfo } from '../../models/declarations/enum-info.model';

export class MapEnumService {


    // TODO: check if we need options & create diagram
    static async create<T>(target: string, data: any): Promise<T | T[]> {
        const enumDeclaration: EnumDeclaration = getTypeDeclaration(target) as EnumDeclaration;
        console.log(chalk.magentaBright('ENUMMMMMM'), enumDeclaration?.getStructure());
        console.log(chalk.cyanBright('ENUMMMMMM infoooo'), GLOBAL.declarationInfos.find(d => d.name === enumDeclaration.getName()));
        const enumInfo: EnumInfo = GLOBAL.getEnumInfo(target);
        if (isArray(data) && isBracketed(target)) {
            return await this.createEnumsArray(data, enumDeclaration);
        } else if (!isArray(data) && !isBracketed(target)) {
            const zzz = await this.map(data, enumInfo);
            console.log(chalk.greenBright('CREATED ENUMMMMM'), zzz);
            return zzz as any;
        } else {
            return undefined;
        }
    }



    // TODO: check if we need options & create diagram
    // static async create<T>(target: string, data: any): Promise<T | T[]> {
    //     const enumDeclaration: EnumDeclaration = getTypeDeclaration(target) as EnumDeclaration;
    //     console.log(chalk.magentaBright('ENUMMMMMM'), enumDeclaration?.getStructure());
    //     console.log(chalk.cyanBright('ENUMMMMMM infoooo'), GLOBAL.declarationInfos.find(d => d.name === enumDeclaration.getName()));
    //     const enumInfo: EnumInfo = GLOBAL.getEnumInfo(target);
    //     if (isArray(data) && isBracketed(target)) {
    //         return await this.createEnumsArray(data, enumDeclaration);
    //     } else if (!isArray(data) && !isBracketed(target)) {
    //         const zzz = await this.createEnum(data, enumDeclaration);
    //         console.log(chalk.greenBright('CREATED ENUMMMMM'), zzz);
    //         return zzz as any;
    //     } else {
    //         return undefined;
    //     }
    // }


    private static async createEnumsArray<T>(data: any[], enumDeclaration: EnumDeclaration): Promise<T[]> {
        const enumsArray: T[] = [];
        for (const element of data) {
            const value: T = await this.createEnum(element, enumDeclaration);
            enumsArray.push(value);
        }
        return enumsArray;
    }


    // private static getValue(target: string, data: any)


    private static async createEnum<T>(data: any, enumDeclaration: EnumDeclaration): Promise<T> {
        return await newMappedElement(this.map, data, enumDeclaration);
    }


    static async map(dataValue: any, enumInfo: EnumInfo): Promise<void> {
        if (this.isEnumValue(dataValue, enumInfo)) {
            return dataValue;
        } else {
            return undefined;
        }
    }

    // static async map(target: any, key: StringOrNumber, dataValue: any, declaration: EnumDeclaration): Promise<void> {
    //     if (this.isEnumValue(declaration, dataValue)) {
    //         target[key] = dataValue;
    //     }
    // }

    private static isEnumValue(value: any, enumInfo: EnumInfo): boolean {
        return enumInfo.initializers.includes(value);
    }


    private static enumValues(declaration: EnumDeclaration): any[] {
        return declaration.getStructure().members?.map(m => (m.initializer as string).slice(1, -1));
    }


}
