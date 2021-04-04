import 'reflect-metadata';
import { GLOBAL } from '../const/global.const';
import { MapperBehavior } from '../../shared/models/config-behavior.model';
import { clone, isBoolean } from '@genese/core';

/**
 * Initializes the specific configuration of a call to the create() method
 */
export class OptionsService {

    /**
     * Initializes the specific configuration of a call to the create() method
     * @param options
     */
    static initialize(options: MapperBehavior): MapperBehavior {
        const createOptions: MapperBehavior = clone(GLOBAL.config);
        if (!options) {
            return createOptions;
        }
        createOptions.castStringsAndNumbers = isBoolean(options?.castStringsAndNumbers) ? options.castStringsAndNumbers : createOptions.castStringsAndNumbers;
        return createOptions;
    }

}
