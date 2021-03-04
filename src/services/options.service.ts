import { CreateOptions } from '../models/create-options.model';
import 'reflect-metadata';
import { isObjectWhichIsNotArray } from '../utils/native/objects.util';
import { CONFIG } from '../const/config.const';
import { isBoolean } from '../utils/native/booleans.util';
import * as chalk from 'chalk';
import { clone } from '../utils/native/clone.util';

export class OptionsService {


    static wasInitialized(options: CreateOptions): boolean {
        if (!isObjectWhichIsNotArray(options)) {
            return false;
        }
        return Reflect.hasMetadata('initialized', options);
    }


    static initialize(options: CreateOptions): CreateOptions {
        const createOptions = clone(CONFIG.create);
        if (!options) {
            return createOptions;
        }
        createOptions.differentiateStringsAndNumbers = isBoolean(options?.differentiateStringsAndNumbers) ? options.differentiateStringsAndNumbers : CONFIG.create.differentiateStringsAndNumbers;
        createOptions.throwTarget.error = options?.throwTarget?.hasOwnProperty('error') ? options.throwTarget.error : CONFIG.create.throwTarget.error;
        createOptions.throwTarget.setToUndefined = options?.throwTarget?.hasOwnProperty('setUndefined') ? options.throwTarget.setToUndefined : CONFIG.create.throwTarget.setToUndefined;
        Reflect.defineMetadata('initialized', true, createOptions);
        console.log(chalk.blueBright('OPTTTTTT'), options);
        return createOptions;
    }

}
