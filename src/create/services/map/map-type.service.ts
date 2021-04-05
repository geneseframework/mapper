import { MainService } from '../main.service';
import { GLOBAL } from '../../const/global.const';
import { TypeInfo } from '../../../shared/models/declarations/type-info.model';
import { MapperConfigBehavior } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import * as chalk from 'chalk';

export class MapTypeService {

    /**
     * Returns the data mapped with the target defined by the stringified definition of a given type
     * @param target    // The target with type format
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: string, data: any, options: MapperConfigBehavior): MapResponse {
        const typeInfo: TypeInfo = GLOBAL.getTypeInfo(target);
        return MainService.mapStringTarget(typeInfo.stringifiedType, data, options);
    }

}
