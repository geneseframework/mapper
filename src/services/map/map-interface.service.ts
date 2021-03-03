import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { implementsRequiredProperties } from '../../utils/ast/ast-interfaces.util';
import { MapInstanceOrInterfaceServiceOld } from './map-instance-or-interface.service.old';
import { throwWarning } from '../../utils/errors.util';
import { DateDeclaration } from '../../models/date-declaration.model';
import { MapDateService } from './map-date.service';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { CreateOptions } from '../../interfaces/create-options.interface';
import * as chalk from 'chalk';

export class MapInterfaceService {


    static async create<T>(data: any[], interfaceName: string, isArray: boolean, options: CreateOptions): Promise<T[] | Date[]>
    static async create<T>(data: any, interfaceName: string, isArray: boolean, options: CreateOptions): Promise<T | Date>
    static async create<T>(data: any, interfaceName: string, isArray: boolean, options: CreateOptions): Promise<T | T[] | Date | Date[]> {
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(interfaceName) as InterfaceDeclaration;
        if (!interfaceDeclaration) {
            throwWarning(`Warning: interface declaration not found for "${interfaceName}". The value "${data}" was replaced by "undefined".`);
            return undefined;
        } else if (interfaceDeclaration instanceof DateDeclaration) {
            return MapDateService.createDate(data);
        } else if (Array.isArray(data) && isArray) {
            return await MapInstanceOrInterfaceServiceOld.createArray(data, interfaceDeclaration, options);
        } else if (!Array.isArray(data) && !isArray) {
            return await this.createInterface(data, interfaceDeclaration, options);
        }  else {
            return undefined;
        }
    }


    static async createInterface<T>(data: any, interfaceDeclaration: InterfaceDeclaration, options: CreateOptions): Promise<T | Date> {
        const tInterface = {};
        await MapInstanceOrInterfaceServiceOld.map(tInterface, data, interfaceDeclaration, options);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }

}
