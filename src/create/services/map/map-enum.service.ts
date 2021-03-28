import { isBracketed } from '../../types/target/string/bracketed.type';
import { GLOBAL } from '../../const/global.const';
import { EnumInfo } from '../../../shared/models/declarations/enum-info.model';
import { isArray } from '../../../shared/utils/arrays.util';

export class MapEnumService {


    // TODO: check if we need options & create diagram
    static create<T>(target: string, data: any): T | T[] {
        const enumInfo: EnumInfo = GLOBAL.getEnumInfo(target);
        if (isArray(data) && isBracketed(target)) {
            return this.createEnumsArray(data, enumInfo);
        } else if (!isArray(data) && !isBracketed(target)) {
            return this.map(data, enumInfo);
        } else {
            return undefined;
        }
    }


    private static createEnumsArray<T>(data: any[], enumInfo: EnumInfo): T[] {
        const enumsArray: T[] = [];
        for (const element of data) {
            const value: T = this.map(element, enumInfo);
            enumsArray.push(value);
        }
        return enumsArray;
    }


    static map(dataValue: any, enumInfo: EnumInfo): any {
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
