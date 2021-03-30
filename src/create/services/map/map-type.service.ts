import { MainService } from '../main.service';
import { GLOBAL } from '../../const/global.const';
import { TypeInfo } from '../../../shared/models/declarations/type-info.model';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import * as chalk from 'chalk';

export class MapTypeService {

    /**
     * Returns the data mapped with the target defined by the stringified definition of a given type
     * @param target    // The target with type format
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create<T>(target: string, data: any, options: MapperBehavior): any {
        const typeInfo: TypeInfo = GLOBAL.getTypeInfo(target);
        return MainService.mapStringTarget(typeInfo.stringifiedType, data, options);
    }

}
