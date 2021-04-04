import { GLOBAL } from '../../const/global.const';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { InstanceGenerator } from '../../../shared/models/instance-generator.model';
import { ClassInfo } from '../../../shared/models/declarations/class-info.model';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { isObjectWhichIsNotArray } from '../../types/trivial-types/not-some-type.type';
import { throwWarning } from '@genese/core';

export class MapClassService<T> {

    /**
     * When target corresponds to an exported class, returns instance with mapped data if data is an object, undefined if not
     * @param target    // The stringified target
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: string, data: any, options: MapperBehavior): any {
        return !isObjectWhichIsNotArray(data) ? undefined : this.createInstance(target, data, options);
    }


    /**
     * Returns instance with mapped data
     * @param target    // The target corresponding to an exported class
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static createInstance(target: string, data: any, options: MapperBehavior): any {
        const classInfo: ClassInfo = GLOBAL.getClassInfo(target);
        if (classInfo.isAbstract) {
            throwWarning(`"${target}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator(target, classInfo.filePath, classInfo.numberOfConstructorArguments);
        const instance: object = GLOBAL.generateInstance(instanceGenerator) as object;
        MapInstanceOrInterfaceService.map(data, options, instance, classInfo);
        return instance;
    }
}
