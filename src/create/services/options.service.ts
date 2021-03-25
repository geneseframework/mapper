import 'reflect-metadata';
import { isBoolean } from '../utils/native/booleans.util';
import { clone } from '../utils/native/clone.util';
import { GLOBAL } from '../const/global.const';
import { MapperBehavior } from '../../shared/models/config-behavior.model';
import { isObjectWhichIsNotArray } from '../types/not-some-type.type';

export class OptionsService {


    static wasInitialized(options: MapperBehavior): boolean {
        if (!isObjectWhichIsNotArray(options)) {
            return false;
        }
        return Reflect.hasMetadata('initialized', options);
    }


    static initialize(options: MapperBehavior): MapperBehavior {
        const createOptions: MapperBehavior = clone(GLOBAL.config);
        if (!options) {
            return createOptions;
        }
        createOptions.castStringsAndNumbers = isBoolean(options?.castStringsAndNumbers) ? options.castStringsAndNumbers : createOptions.castStringsAndNumbers;
        Reflect.defineMetadata('initialized', true, createOptions);
        return createOptions;
    }

}
