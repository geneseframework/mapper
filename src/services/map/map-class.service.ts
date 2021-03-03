import { ClassDeclaration } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../../utils/ast/ast-class.util';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { MapInstanceOrInterfaceServiceOld } from './map-instance-or-interface.service.old';
import { throwWarning } from '../../utils/errors.util';
import * as chalk from 'chalk';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { CreateOptions } from '../../interfaces/create-options.interface';
import { isArray } from '../../utils/native/arrays.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';

export class MapClassService<T> {


    static async create<T>(className: string, data: any, options: CreateOptions): Promise<T> {
        const classDeclaration: ClassDeclaration = getTypeDeclaration(className) as ClassDeclaration;
        console.log(chalk.magentaBright('MAP CLASSSSSSS'), className, classDeclaration?.getName());
        return isArray(data) ? undefined : await this.createInstance<T>(className, data, classDeclaration, options);
    }


    // static async create<T>(data: any[], className: string, options: CreateOptions): Promise<T[] | string[] | number[] | boolean[]>
    // static async create<T>(data: any, className: string, options: CreateOptions): Promise<T>
    // static async create<T>(data: any, className: string, options: CreateOptions): Promise<T |T[] | string | string[] | number | number[] | boolean | boolean[]> {
    //     const classDeclaration: ClassDeclaration = getTypeDeclaration(className) as ClassDeclaration;
    //     return Array.isArray(data) ? await MapInstanceOrInterfaceServiceOld.createArray(data, classDeclaration, options, className) : await this.createInstance<T>(data, className, classDeclaration, options);
    // }


    static async createInstance<T>(target: string, data: any, classDeclaration: ClassDeclaration, options: CreateOptions): Promise<T> {
        if (classDeclaration.isAbstract()) {
            throwWarning(`Warning: "${target}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator<T>(target, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        const instance: T = await GLOBAL.generateInstance(instanceGenerator);
        await MapInstanceOrInterfaceService.map(instance, data, classDeclaration, options);
        return instance;
    }
}
