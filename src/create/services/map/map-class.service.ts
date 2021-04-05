import { GLOBAL } from '../../const/global.const';
import { MapInstanceOrInterfaceService } from './map-instance-or-interface.service';
import { InstanceGenerator } from '../../../shared/models/instance-generator.model';
import { ClassInfo } from '../../../shared/models/declarations/class-info.model';
import { isObjectWhichIsNotArray } from '../../types/trivial-types/not-some-type.type';
import { MapperConfigBehavior, throwWarning } from '@genese/core';
import * as chalk from 'chalk';
import { MapResponse } from '../../models/map-response.model';

export class MapClassService<T> {

    /**
     * When target corresponds to an exported class, returns instance with mapped data if data is an object, undefined if not
     * @param target    // The stringified target
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: string, data: any, options: MapperConfigBehavior): MapResponse {
        return !isObjectWhichIsNotArray(data) ? undefined : this.createInstance(target, data, options);
    }


    /**
     * Returns instance with mapped data
     * @param target    // The target corresponding to an exported class
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static createInstance(target: string, data: any, options: MapperConfigBehavior): MapResponse {
        const classInfo: ClassInfo = GLOBAL.getClassInfo(target);
        if (classInfo.isAbstract) {
            throwWarning(`"${target}" is abstract and can't be instantiated.`);
            return undefined;
        }
        const instanceGenerator = new InstanceGenerator(target, classInfo.filePath, classInfo.numberOfConstructorArguments);
        const instance: object = GLOBAL.generateInstance(instanceGenerator) as object;
        const mapped: any = MapInstanceOrInterfaceService.map(data, options, instance, classInfo);
        console.log(chalk.redBright('INSTANCEEEEE is valid'), mapped);
        return mapped;
        // return isValid ? instance : undefined;
    }
}
