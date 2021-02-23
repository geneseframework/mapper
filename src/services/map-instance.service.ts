import { ClassDeclaration } from 'ts-morph';
import { GLOBAL } from '../const/global.const';
import { InstanceGenerator } from '../models/instance-generator.model';
import { getNumberOfConstructorArguments } from '../utils/ast-class.util';
import { getTypeDeclaration } from '../utils/ast-declaration.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { throwWarning } from '../utils/errors.util';
import * as chalk from 'chalk';

export class MapInstanceService<T> {


    static async createInstances<T>(data: any[], className: string): Promise<T[] | string[] | number[] | boolean[]>
    static async createInstances<T>(data: any, className: string): Promise<T>
    static async createInstances<T>(data: any, className: string): Promise<T |T[] | string | string[] | number | number[] | boolean | boolean[]> {
        const classDeclaration: ClassDeclaration = getTypeDeclaration(className) as ClassDeclaration;
        return Array.isArray(data) ? await MapInstanceOrInterfaceService.createArray(data, classDeclaration, className) : await this.createInstance<T>(data, className, classDeclaration);
    }


    static async createInstance<T>(data: any, className: string, classDeclaration: ClassDeclaration): Promise<T> {
        if (classDeclaration.isAbstract()) {
            throwWarning(`Warning: "${className}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator<T>(className, classDeclaration.getSourceFile().getFilePath(), getNumberOfConstructorArguments(classDeclaration));
        // console.log(chalk.blueBright('MAP INSTANCEEEEE'), data, className);
        GLOBAL.logDuration('beFORE INSTANCEEEEE')
        const instance: T = await GLOBAL.generateInstance(instanceGenerator);
        GLOBAL.logDuration('AFTER INSTANCEEEEE')
        // console.log(chalk.cyanBright('MAP INSTANCEEEEE ?????'), instance);
        await MapInstanceOrInterfaceService.map(instance, data, classDeclaration);
        // console.log(chalk.magentaBright('MAP INSTANCEEEEE ?????'), instance);
        return instance;
    }
}
