import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { implementsRequiredProperties } from '../../utils/ast/ast-interfaces.util';
import { MapInstanceOrInterfaceServiceOld } from './map-instance-or-interface.service.old';
import { throwWarning } from '../../utils/errors.util';
import { DateDeclaration } from '../../models/date-declaration.model';
import { MapDateService } from './map-date.service';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { CreateOptions } from '../../models/create-options.model';
import * as chalk from 'chalk';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';

export class MapInterfaceService {


    static async create<T>(target: string, data: any, options: CreateOptions): Promise<T | T[] | Date | Date[]> {
        // console.log(chalk.cyanBright('CREATE INTERFFFFFF'), target, data);
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(target) as InterfaceDeclaration;
        // console.log(chalk.cyanBright('CREATE INTERFFFFFF DECLLLLL'), interfaceDeclaration?.getStructure());
        return !isObjectWhichIsNotArray(data) ? undefined : await this.createInterface<T>(target, data, interfaceDeclaration, options);
        // if (!interfaceDeclaration) {
        //     throwWarning(`Warning: interface declaration not found for "${target}". The value "${data}" was replaced by "undefined".`);
        //     return undefined;
        // } else if (interfaceDeclaration instanceof DateDeclaration) {
        //     return MapDateService.createDate(data);
        // } else if (Array.isArray(data) && isArray) {
        //     return await MapInstanceOrInterfaceService.createArray(data, interfaceDeclaration, options);
        // } else if (!Array.isArray(data) && !isArray) {
        //     return await this.createInterface(data, interfaceDeclaration, options);
        // }  else {
        //     return undefined;
        // }
    }


    // static async create<T>(data: any[], interfaceName: string, isArray: boolean, options: CreateOptions): Promise<T[] | Date[]>
    // static async create<T>(data: any, interfaceName: string, isArray: boolean, options: CreateOptions): Promise<T | Date>
    // static async create<T>(data: any, interfaceName: string, isArray: boolean, options: CreateOptions): Promise<T | T[] | Date | Date[]> {
    //     const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(interfaceName) as InterfaceDeclaration;
    //     if (!interfaceDeclaration) {
    //         throwWarning(`Warning: interface declaration not found for "${interfaceName}". The value "${data}" was replaced by "undefined".`);
    //         return undefined;
    //     } else if (interfaceDeclaration instanceof DateDeclaration) {
    //         return MapDateService.createDate(data);
    //     } else if (Array.isArray(data) && isArray) {
    //         return await MapInstanceOrInterfaceService.createArray(data, interfaceDeclaration, options);
    //     } else if (!Array.isArray(data) && !isArray) {
    //         return await this.createInterface(data, interfaceDeclaration, options);
    //     }  else {
    //         return undefined;
    //     }
    // }


    static async createInterface<T>(target: string, data: any, interfaceDeclaration: InterfaceDeclaration, options: CreateOptions): Promise<T | Date> {
        const tInterface = {};
        await MapInstanceOrInterfaceService.map(target, data, options, tInterface, interfaceDeclaration);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }

}
