import { isBracketed } from '../../types/containers/bracketed.type';
import { GLOBAL } from '../../const/global.const';
import { EnumInfo } from '../../../shared/models/declarations/enum-info.model';
import { isArray } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import { INVALID_RESPONSE } from '../../const/invalid-response.const';

export class MapEnumService {

    /**
     * Return mapped data when target corresponds to an exported enum or an array of enums
     * @param target    // The target corresponding to an exported enum
     * @param data      // The data to map
     */
    static create(target: string, data: any): MapResponse {
        const enumInfo: EnumInfo = GLOBAL.getEnumInfo(target);
        if (isArray(data) && isBracketed(target)) {
            return this.createEnumsArray(data, enumInfo);
        } else if (!isArray(data) && !isBracketed(target)) {
            return new MapResponse(this.map(data, enumInfo));
        } else {
            return INVALID_RESPONSE;
        }
    }

    /**
     * Return mapped data when target corresponds to an array of enums
     * @param data      // The data to map
     * @param enumInfo  // Some enumInfo found in global declarationInfos array
     */
    private static createEnumsArray(data: any[], enumInfo: EnumInfo): MapResponse {
        const enumsArray: any[] = [];
        for (const element of data) {
            const value: any = this.map(element, enumInfo);
            enumsArray.push(value);
        }
        return new MapResponse(enumsArray);
    }

    /**
     * Return mapped data when target corresponds to an enum
     * @param data      // The data to map
     * @param enumInfo  // Some enumInfo found in global declarationInfos array
     */
    static map(data: any, enumInfo: EnumInfo): any {
        if (this.isEnumValue(data, enumInfo)) {
            return data;
        } else {
            return undefined;
        }
    }

    /**
     * Checks if a value is one of the values of a given enum
     * @param value
     * @param enumInfo
     * @private
     */
    private static isEnumValue(value: any, enumInfo: EnumInfo): boolean {
        return enumInfo.initializers.includes(value);
    }

}
