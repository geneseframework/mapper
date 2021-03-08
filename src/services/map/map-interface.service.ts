import { implementsRequiredProperties } from '../../utils/ast/ast-interfaces.util';
import { CreateOptions } from '../../models/create-options.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import { GLOBAL } from '../../const/global.const';
import { InterfaceInfo } from '../../models/declarations/interface-info.model';
import * as chalk from 'chalk';

export class MapInterfaceService {


    static async create<T>(target: string, data: any, options: CreateOptions): Promise<T | T[] | Date | Date[]> {
        return !isObjectWhichIsNotArray(data) ? undefined : await this.createInterface<T>(target, data, options);
    }


    static async createInterface<T>(target: string, data: any, options: CreateOptions): Promise<T | Date> {
        const interfaceInfo: InterfaceInfo = GLOBAL.getInterfaceInfo(target);
        console.log(chalk.magentaBright('GLOBBBB DECLLLLL'), GLOBAL.declarationInfos.find(d => d.name === 'ColorSupport'));
        console.log(chalk.magentaBright('CREATE INTERFFFFF'), target, interfaceInfo);
        const tInterface = {};
        await MapInstanceOrInterfaceService.map(data, options, tInterface, interfaceInfo);
        return implementsRequiredProperties(tInterface, interfaceInfo) ? tInterface as T : undefined;
    }

}
