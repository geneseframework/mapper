import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { GLOBAL } from '../../const/global.const';
import { InterfaceInfo } from '../../../shared/models/declarations/interface-info.model';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { isObjectWhichIsNotArray, ObjectNotArray } from '../../types/trivial-types/not-some-type.type';
import { includes } from '../../../shared/utils/arrays.util';
import * as chalk from 'chalk';

export class MapInterfaceService {

    /**
     * When target corresponds to an exported interface, returns object respecting interface with mapped data if data is an object respecting the interface, undefined if not
     * @param target    // The target corresponding to an exported class
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: string, data: any, options: MapperBehavior): any {
        return !isObjectWhichIsNotArray(data) ? undefined : this.createInterface(target, data, options);
    }


    /**
     * When target corresponds to an exported interface, returns object respecting interface with mapped data if data has required properties, undefined if not
     * @param target    // The target corresponding to an exported class
     * @param data      // The object to map (which is not an array)
     * @param options   // The create() options
     */
    static createInterface(target: string, data: ObjectNotArray, options: MapperBehavior): any {
        const interfaceInfo: InterfaceInfo = GLOBAL.getInterfaceInfo(target);
        const tInterface = {};
        MapInstanceOrInterfaceService.map(data, options, tInterface, interfaceInfo);
        return this.hasRequiredProperties(tInterface, interfaceInfo) ? tInterface : undefined;
    }


    /**
     * Checks if data has required properties of the interface
     * @param data              // The data to check
     * @param interfaceInfo     // The interface info
     * @private
     */
    private static hasRequiredProperties(data: ObjectNotArray, interfaceInfo: InterfaceInfo): boolean {
        const requiredProperties: string[] = interfaceInfo.properties.filter(p => p.isRequired).map(p => p.name);
        return includes(Object.keys(data), requiredProperties);
    }

}
