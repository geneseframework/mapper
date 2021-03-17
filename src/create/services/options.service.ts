import { Config } from '../../shared/models/config.model';
import 'reflect-metadata';
import { isObjectWhichIsNotArray } from '../utils/native/objects.util';
import { CONFIG_OLD } from '../const/config.const';
import { isBoolean } from '../utils/native/booleans.util';
import { clone } from '../utils/native/clone.util';
import { GLOBAL } from '../const/global.const';

export class OptionsService {


    static wasInitialized(options: Config): boolean {
        if (!isObjectWhichIsNotArray(options)) {
            return false;
        }
        return Reflect.hasMetadata('initialized', options);
    }


    static initialize(options: Config): Config {
        const createOptions = clone(GLOBAL.config);
        if (!options) {
            return createOptions;
        }
        createOptions.differentiateStringsAndNumbers = isBoolean(options?.differentiateStringsAndNumbers) ? options.differentiateStringsAndNumbers : CONFIG_OLD.create.differentiateStringsAndNumbers;
        createOptions.throwTarget.error = options?.throwTarget?.hasOwnProperty('error') ? options.throwTarget.error : CONFIG_OLD.create.throwTarget.error;
        createOptions.throwTarget.setToUndefined = options?.throwTarget?.hasOwnProperty('setToUndefined') ? options.throwTarget.setToUndefined : CONFIG_OLD.create.throwTarget.setToUndefined;
        Reflect.defineMetadata('initialized', true, createOptions);
        return createOptions;
    }

}
