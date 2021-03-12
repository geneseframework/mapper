import { GLOBAL } from '../../const/global.const';
import { InstanceGenerator } from '../../models/instance-generator.model';
import { throwWarning } from '../../utils/errors.util';
import { CreateOptions } from '../../models/create-options.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import { ClassInfo } from '../../models/declarations/class-info.model';
import * as chalk from 'chalk';

export class MapClassService<T> {


    static async create(target: string, data: any, options: CreateOptions): Promise<any> {
        return !isObjectWhichIsNotArray(data) ? undefined : await this.createInstance(target, data, options);
    }


    static async createInstance(target: string, data: any, options: CreateOptions): Promise<any> {
        const classInfo: ClassInfo = GLOBAL.getClassInfo(target);
        console.log(chalk.cyanBright('CREATE INSTTTTT'), target, data, classInfo);
        // console.log(chalk.cyanBright('GLOBAL infos'), target, data, classInfo);
        if (classInfo.isAbstract) {
            throwWarning(`"${target}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator(target, classInfo.filePath, classInfo.numberOfConstructorArguments);
        // const instance: object = await generateInstance(instanceGenerator) as object;
        console.log(chalk.cyanBright('CREATE INSTTTTT instanceGenerator'), instanceGenerator);
        const instance: object = await GLOBAL.generateInstance(instanceGenerator) as object;
        console.log(chalk.cyanBright('CREATE INSTTTTT instance ????'), instance);
        await MapInstanceOrInterfaceService.map(data, options, instance, classInfo);
        return instance;
    }
}
