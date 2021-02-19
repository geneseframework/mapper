import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { implementsRequiredProperties } from '../utils/ast-interfaces.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import * as chalk from 'chalk';
import { throwWarning } from '../utils/errors.util';

export class MapInterfaceService {


    static createInterfaces<T>(data: any[], interfaceName: string, isArray: boolean): T[]
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T
    static createInterfaces<T>(data: any, interfaceName: string, isArray: boolean): T | T[] {
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(interfaceName) as InterfaceDeclaration;
        console.log(chalk.redBright('MAP INTERFACEEEE'), data, interfaceName, interfaceDeclaration);
        if (!interfaceDeclaration) {
            throwWarning(`Warning: interface declaration not found for "${interfaceName}". The value "${data}" was replaced by "undefined".`);
            return undefined;
        }
        if (Array.isArray(data) && isArray) {
            return MapInstanceOrInterfaceService.createArray(data, interfaceDeclaration);
        } else if (!Array.isArray(data) && !isArray) {
            return this.createInterface(data, interfaceDeclaration);
        } else {
            return undefined;
        }
    }


    static createInterface<T>(data: any, interfaceDeclaration: InterfaceDeclaration): T {
        const tInterface = {};
        MapInstanceOrInterfaceService.map(tInterface, data, interfaceDeclaration);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }

}
