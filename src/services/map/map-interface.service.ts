import { InterfaceDeclaration } from 'ts-morph';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { implementsRequiredProperties } from '../../utils/ast/ast-interfaces.util';
import { CreateOptions } from '../../models/create-options.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';

export class MapInterfaceService {


    static async create<T>(target: string, data: any, options: CreateOptions): Promise<T | T[] | Date | Date[]> {
        const interfaceDeclaration: InterfaceDeclaration = getTypeDeclaration(target) as InterfaceDeclaration;
        return !isObjectWhichIsNotArray(data) ? undefined : await this.createInterface<T>(target, data, interfaceDeclaration, options);
    }


    static async createInterface<T>(target: string, data: any, interfaceDeclaration: InterfaceDeclaration, options: CreateOptions): Promise<T | Date> {
        const tInterface = {};
        await MapInstanceOrInterfaceService.map(data, options, tInterface, interfaceDeclaration);
        return implementsRequiredProperties(tInterface, interfaceDeclaration) ? tInterface as T : undefined;
    }

}
