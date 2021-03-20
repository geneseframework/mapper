import { GLOBAL } from '../../const/global.const';
import { throwWarning } from '../../utils/errors.util';
import { MapperConfig } from '../../../shared/models/config.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import { InstanceGenerator } from '../../../shared/models/instance-generator.model';
import { ClassInfo } from '../../../shared/models/declarations/class-info.model';
import * as chalk from 'chalk';

export class MapClassService<T> {


    static create(target: string, data: any, options: MapperConfig): any {
        return !isObjectWhichIsNotArray(data) ? undefined : this.createInstance(target, data, options);
    }


    static createInstance(target: string, data: any, options: MapperConfig): any {
        const classInfo: ClassInfo = GLOBAL.getClassInfo(target);
        if (classInfo.isAbstract) {
            throwWarning(`"${target}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator(target, classInfo.filePath, classInfo.numberOfConstructorArguments);
        // console.log(chalk.cyanBright('MAP CLASSSS'), target, data, instanceGenerator);
        const instance: object = GLOBAL.generateInstance(instanceGenerator) as object;
        MapInstanceOrInterfaceService.map(data, options, instance, classInfo);
        return instance;
    }
}
