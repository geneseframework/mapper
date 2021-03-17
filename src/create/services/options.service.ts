import { MapperConfig } from '../../shared/models/config.model';
import 'reflect-metadata';
import { isObjectWhichIsNotArray } from '../utils/native/objects.util';
// import { CONFIG_OLD } from '../const/config.const';
import { isBoolean } from '../utils/native/booleans.util';
import { clone } from '../utils/native/clone.util';
import { GLOBAL } from '../const/global.const';

export class OptionsService {


    static wasInitialized(options: MapperConfig): boolean {
        if (!isObjectWhichIsNotArray(options)) {
            return false;
        }
        return Reflect.hasMetadata('initialized', options);
    }


    static initialize(options: MapperConfig): MapperConfig {
        const createOptions: MapperConfig = clone(GLOBAL.config);
        if (!options) {
            return createOptions;
        }
        createOptions.behavior.differentiateStringsAndNumbers = isBoolean(options?.behavior?.differentiateStringsAndNumbers) ? options.behavior.differentiateStringsAndNumbers : createOptions.behavior.differentiateStringsAndNumbers;
        // config.throwTarget.error = options?.throwTarget?.hasOwnProperty('error') ? options.throwTarget.error : config.throwTarget.error;
        // config.throwTarget.setToUndefined = options?.throwTarget?.hasOwnProperty('setToUndefined') ? options.throwTarget.setToUndefined : config.throwTarget.setToUndefined;
        Reflect.defineMetadata('initialized', true, createOptions);
        return createOptions;
    }

}
