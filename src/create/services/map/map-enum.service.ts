import { isArray } from '../../utils/native/arrays.util';
import { isBracketed } from '../../types/target/string/bracketed.type';
import { GLOBAL } from '../../const/global.const';
import { EnumInfo } from '../../../shared/models/declarations/enum-info.model';

export class MapEnumService {


    // TODO: check if we need options & create diagram
    static async create<T>(target: string, data: any): Promise<T | T[]> {
        const enumInfo: EnumInfo = GLOBAL.getEnumInfo(target);
        if (isArray(data) && isBracketed(target)) {
            return await this.createEnumsArray(data, enumInfo);
        } else if (!isArray(data) && !isBracketed(target)) {
            return await this.map(data, enumInfo);
        } else {
            return undefined;
        }
    }


    private static async createEnumsArray<T>(data: any[], enumInfo: EnumInfo): Promise<T[]> {
        const enumsArray: T[] = [];
        for (const element of data) {
            const value: T = await this.map(element, enumInfo);
            enumsArray.push(value);
        }
        return enumsArray;
    }


    static async map(dataValue: any, enumInfo: EnumInfo): Promise<any> {
        if (this.isEnumValue(dataValue, enumInfo)) {
            return dataValue;
        } else {
            return undefined;
        }
    }


    private static isEnumValue(value: any, enumInfo: EnumInfo): boolean {
        return enumInfo.initializers.includes(value);
    }

}
