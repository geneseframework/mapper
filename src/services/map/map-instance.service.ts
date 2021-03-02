import { ClassDeclaration } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../../utils/ast-class.util';
import { getTypeDeclaration } from '../../utils/ast-declaration.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { throwWarning } from '../../utils/errors.util';
import * as chalk from 'chalk';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { CreateOptions } from '../../interfaces/create-options.interface';

export class MapInstanceService<T> {


    static async create<T>(data: any[], className: string, options: CreateOptions): Promise<T[] | string[] | number[] | boolean[]>
    static async create<T>(data: any, className: string, options: CreateOptions): Promise<T>
    static async create<T>(data: any, className: string, options: CreateOptions): Promise<T |T[] | string | string[] | number | number[] | boolean | boolean[]> {
        const classDeclaration: ClassDeclaration = getTypeDeclaration(className) as ClassDeclaration;
        return Array.isArray(data) ? await MapInstanceOrInterfaceService.createArray(data, classDeclaration, options, className) : await this.createInstance<T>(data, className, classDeclaration, options);
    }


    static async createInstance<T>(data: any, className: string, classDeclaration: ClassDeclaration, options: CreateOptions): Promise<T> {
        if (classDeclaration.isAbstract()) {
            throwWarning(`Warning: "${className}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator<T>(className, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        const instance: T = await GLOBAL.generateInstance(instanceGenerator);
        await MapInstanceOrInterfaceService.map(instance, data, classDeclaration, options);
        return instance;
    }
}
