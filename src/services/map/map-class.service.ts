import { ClassDeclaration } from 'ts-morph';
import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../../utils/ast/ast-class.util';
import { getTypeDeclaration } from '../../utils/ast/ast-declaration.util';
import { throwWarning } from '../../utils/errors.util';
import { CreateOptions } from '../../models/create-options.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';

export class MapClassService<T> {


    static async create<T>(target: string, data: any, options: CreateOptions): Promise<T> {
        const classDeclaration: ClassDeclaration = getTypeDeclaration(target) as ClassDeclaration;
        return !isObjectWhichIsNotArray(data) ? undefined : await this.createInstance<T>(target, data, classDeclaration, options);
    }


    static async createInstance<T>(target: string, data: any, classDeclaration: ClassDeclaration, options: CreateOptions): Promise<T> {
        if (classDeclaration.isAbstract()) {
            throwWarning(`"${target}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator<T>(target, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        const instance: T = await GLOBAL.generateInstance(instanceGenerator);
        await MapInstanceOrInterfaceService.map(data, options, instance, classDeclaration);
        return instance;
    }
}
