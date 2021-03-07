import { ClassDeclaration } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { numberOfConstructorArgs } from '../../utils/ast/ast-class.util';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { throwWarning } from '../../utils/errors.util';
import { CreateOptions } from '../../models/create-options.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import * as chalk from 'chalk';

export class MapClassService<T> {


    static async create(target: string, data: any, options: CreateOptions): Promise<any> {
        const classDeclaration: ClassDeclaration = getTypeDeclaration(target) as ClassDeclaration;
        return !isObjectWhichIsNotArray(data) ? undefined : await this.createInstance(target, data, classDeclaration, options);
    }


    static async createInstance(target: string, data: any, classDeclaration: ClassDeclaration, options: CreateOptions): Promise<any> {
        if (classDeclaration.isAbstract()) {
            throwWarning(`"${target}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator(target, classDeclaration.getSourceFile().getFilePath(), numberOfConstructorArgs(classDeclaration));
        const instance: object = await GLOBAL.generateInstance(instanceGenerator) as object;
        await MapInstanceOrInterfaceService.map(data, options, instance, classDeclaration);
        return instance;
    }
}
