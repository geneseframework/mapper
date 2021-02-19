import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration, isValidDate, isValidDateConstructor } from '../utils/ast-declaration.util';
import { implementsRequiredProperties } from '../utils/ast-interfaces.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import * as chalk from 'chalk';
import { throwWarning } from '../utils/errors.util';
import { DateDeclaration } from '../models/date-declaration.model';

export class MapInterfaceService {


    static createInterfaces<T>(data: any[], interfaceName: string, isArray: boolean): T[] | Date[]
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T | Date
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T | T[] | Date | Date[] {
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(interfaceName) as InterfaceDeclaration;
        console.log(chalk.redBright('MAP INTERFACEEEE'), data, interfaceName, interfaceDeclaration);
        if (!interfaceDeclaration) {
            throwWarning(`Warning: interface declaration not found for "${interfaceName}". The value "${data}" was replaced by "undefined".`);
            return undefined;
        } else if (interfaceDeclaration instanceof DateDeclaration) {
            console.log(chalk.greenBright('MAP INTERFACEEEE'), data, interfaceName, interfaceDeclaration);
            return this.createDateInterface(data);
        } else if (Array.isArray(data) && isArray) {
            return MapInstanceOrInterfaceService.createArray(data, interfaceDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createInterface(data, interfaceDeclaration);
        }  else {
            return undefined;
        }
    }


    static createInterface<T>(data: any, interfaceDeclaration: InterfaceDeclaration): T | Date {
        const tInterface = {};
        MapInstanceOrInterfaceService.map(tInterface, data, interfaceDeclaration);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }


    private static createDateInterface(data: any): Date | Date[] {
        console.log(chalk.magentaBright('IS VALID ADTE??????'), data, isValidDateConstructor(data));
        if (isValidDateConstructor(data)) {
        // if (isValidDate(data)) {
        // if (data && this.hasDateConstructorFormat(data)) {
            return new Date(data);
        } else {
            return undefined;
        }
    }


    private static hasDateConstructorFormat(data: any): boolean {
        return typeof data === 'string'
        || typeof data === 'number'
        || (typeof data?.year === 'number' && typeof data?.month === 'number');
    }

}
