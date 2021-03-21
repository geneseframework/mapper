import { GLOBAL } from '../../const/global.const';
import { throwWarning } from '../../utils/errors.util';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import { InstanceGenerator } from '../../../shared/models/instance-generator.model';
import { ClassInfo } from '../../../shared/models/declarations/class-info.model';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapClassService<T> {


    static create(target: string, data: any, options: MapperBehavior): any {
        return !isObjectWhichIsNotArray(data) ? undefined : this.createInstance(target, data, options);
    }


    static createInstance(target: string, data: any, options: MapperBehavior): any {
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
