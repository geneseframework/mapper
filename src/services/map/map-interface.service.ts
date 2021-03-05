import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { implementsRequiredProperties } from '../../utils/ast/ast-interfaces.util';
import { MapInstanceOrInterfaceServiceOld } from './map-instance-or-interface.service.old';
import { throwWarning } from '../../utils/errors.util';
import { DateDeclaration } from '../../models/date-declaration.model';
import { MapDateServiceOld } from './map-date.service.old';
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
    }


    static async createInterface<T>(target: string, data: any, interfaceDeclaration: InterfaceDeclaration, options: CreateOptions): Promise<T | Date> {
        const tInterface = {};
        await MapInstanceOrInterfaceService.map(target, data, options, tInterface, interfaceDeclaration);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }

}
