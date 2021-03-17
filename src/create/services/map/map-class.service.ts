import { GLOBAL } from '../../const/global.const';
import { throwWarning } from '../../utils/errors.util';
import { Config } from '../../../shared/models/config.model';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { isObjectWhichIsNotArray } from '../../utils/native/objects.util';
import { InstanceGenerator } from '../../../shared/models/instance-generator.model';
import { ClassInfo } from '../../../shared/models/declarations/class-info.model';

export class MapClassService<T> {


    static async create(target: string, data: any, options: Config): Promise<any> {
        return !isObjectWhichIsNotArray(data) ? undefined : await this.createInstance(target, data, options);
    }


    static async createInstance(target: string, data: any, options: Config): Promise<any> {
        const classInfo: ClassInfo = GLOBAL.getClassInfo(target);
        if (classInfo.isAbstract) {
            throwWarning(`"${target}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator(target, classInfo.filePath, classInfo.numberOfConstructorArguments);
        const instance: object = await GLOBAL.generateInstance(instanceGenerator) as object;
        await MapInstanceOrInterfaceService.map(data, options, instance, classInfo);
        return instance;
    }
}
