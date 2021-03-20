import { MapperConfig } from '../../../shared/models/config.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import { GLOBAL } from '../../const/global.const';
import { includes } from '../../utils/native/arrays.util';
import { InterfaceInfo } from '../../../shared/models/declarations/interface-info.model';

export class MapInterfaceService {


    static create<T>(target: string, data: any, options: MapperConfig): T | T[] | Date | Date[] {
        return !isObjectWhichIsNotArray(data) ? undefined : this.createInterface<T>(target, data, options);
    }


    static createInterface<T>(target: string, data: any, options: MapperConfig): T | Date {
        const interfaceInfo: InterfaceInfo = GLOBAL.getInterfaceInfo(target);
        const tInterface = {};
        MapInstanceOrInterfaceService.map(data, options, tInterface, interfaceInfo);
        return this.implementsRequiredProperties(tInterface, interfaceInfo) ? tInterface as T : undefined;
    }


    private static implementsRequiredProperties(data: any, interfaceInfo: InterfaceInfo): boolean {
        const requiredProperties: any[] = interfaceInfo.properties.filter(p => p.isRequired).map(p => p.name);
        return includes(Object.keys(data), requiredProperties);
    }

}
