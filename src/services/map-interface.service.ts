import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { implementsRequiredProperties } from '../utils/ast-interfaces.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { throwWarning } from '../utils/errors.util';
import { DateDeclaration } from '../models/date-declaration.model';
import { MapDateService } from './map-date.service';

export class MapInterfaceService {


    static async createInterfaces<T>(data: any[], interfaceName: string, isArray: boolean): Promise<T[] | Date[]>
    static async createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): Promise<T | Date>
    static async createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): Promise<T | T[] | Date | Date[]> {
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(interfaceName) as InterfaceDeclaration;
        if (!interfaceDeclaration) {
            throwWarning(`Warning: interface declaration not found for "${interfaceName}". The value "${data}" was replaced by "undefined".`);
            return undefined;
        } else if (interfaceDeclaration instanceof DateDeclaration) {
            return MapDateService.createDate(data);
        } else if (Array.isArray(data) && isArray) {
            return await MapInstanceOrInterfaceService.createArray(data, interfaceDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return await this.createInterface(data, interfaceDeclaration);
        }  else {
            return undefined;
        }
    }


    static async createInterface<T>(data: any, interfaceDeclaration: InterfaceDeclaration): Promise<T | Date> {
        const tInterface = {};
        await MapInstanceOrInterfaceService.map(tInterface, data, interfaceDeclaration);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }

}
