import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { GLOBAL } from '../../const/global.const';
import { InterfaceInfo } from '../../../shared/models/declarations/interface-info.model';
import { isObjectWhichIsNotArray, ObjectNotArray } from '../../types/trivial-types/not-some-type.type';
import { MapperConfigBehavior } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';

export class MapInterfaceService {

    /**
     * When target corresponds to an exported interface, returns object respecting interface with mapped data if data is an object respecting the interface, undefined if not
     * @param target    // The target corresponding to an exported class
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: string, data: any, options: MapperConfigBehavior): MapResponse {
        return !isObjectWhichIsNotArray(data) ? undefined : this.createInterface(target, data, options);
    }


    /**
     * When target corresponds to an exported interface, returns object respecting interface with mapped data if data has required properties, undefined if not
     * @param target    // The target corresponding to an exported class
     * @param data      // The object to map (which is not an array)
     * @param options   // The create() options
     */
    static createInterface(target: string, data: ObjectNotArray, options: MapperConfigBehavior): MapResponse {
        const interfaceInfo: InterfaceInfo = GLOBAL.getInterfaceInfo(target);
        const tInterface = {};
        return MapInstanceOrInterfaceService.map(data, options, tInterface, interfaceInfo);
    }

}
