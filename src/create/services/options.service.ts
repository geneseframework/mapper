import 'reflect-metadata';
import { isBoolean } from '../../shared/core/utils/booleans.util';
import { clone } from '../../shared/core/utils/functions/clone.util';
import { GLOBAL } from '../const/global.const';
import { MapperBehavior } from '../../shared/models/config-behavior.model';

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
