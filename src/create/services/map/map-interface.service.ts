import { CreateOptions } from '../../models/create-options.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import { GLOBAL } from '../../const/global.const';
import { InterfaceInfo } from '../../models/declarations/interface-info.model';
import { includes } from '../../utils/native/arrays.util';

export class MapInterfaceService {


    static async create<T>(target: string, data: any, options: CreateOptions): Promise<T | T[] | Date | Date[]> {
        return !isObjectWhichIsNotArray(data) ? undefined : await this.createInterface<T>(target, data, options);
    }


    static async createInterface<T>(target: string, data: any, options: CreateOptions): Promise<T | Date> {
        const interfaceInfo: InterfaceInfo = GLOBAL.getInterfaceInfo(target);
        const tInterface = {};
        await MapInstanceOrInterfaceService.map(data, options, tInterface, interfaceInfo);
        return this.implementsRequiredProperties(tInterface, interfaceInfo) ? tInterface as T : undefined;
    }


    private static implementsRequiredProperties(data: any, interfaceInfo: InterfaceInfo): boolean {
        const requiredProperties: any[] = interfaceInfo.properties.filter(p => p.isRequired).map(p => p.name);
        return includes(Object.keys(data), requiredProperties);
    }

}
