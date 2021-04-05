import { GLOBAL } from '../const/global.const';
import { clone, isBoolean, MapperConfigBehavior } from '@genese/core';

/**
 * Initializes the specific configuration of a call to the create() method
 */
export class OptionsService {

    /**
     * Initializes the specific configuration of a call to the create() method
     * @param options
     */
    static initialize(options: MapperConfigBehavior): MapperConfigBehavior {
        const createOptions: MapperConfigBehavior = clone(GLOBAL.config);
        if (!options) {
            return createOptions;
        }
        createOptions.castStringsAndNumbers = isBoolean(options?.castStringsAndNumbers) ? options.castStringsAndNumbers : createOptions.castStringsAndNumbers;
        return createOptions;
    }

}
