import { CreateOptions } from '../models/create-options.model';
import 'reflect-metadata';
import { isObjectWhichIsNotArray } from '../utils/native/objects.util';
import { CONFIG } from '../const/config.const';
import { ThrowOption } from '../enums/throw-option.enum';
import * as chalk from 'chalk';
import { isBoolean } from '../utils/native/booleans.util';

export class OptionsService {


    static wasInitialized(options: CreateOptions): boolean {
        if (!isObjectWhichIsNotArray(options)) {
            return false;
        }
        return Reflect.hasMetadata('initialized', options);
    }


    static initialize(options: CreateOptions): CreateOptions {
        // console.log(chalk.cyanBright('OPTTTTTT'), options);
        const createOptions = new CreateOptions();
        if (!options) {
            return createOptions;
        }
        // if (![true, false].includes(options?.differentiateStringsAndNumbers)){
        //     console.log(chalk.redBright('CREATTTT OPTTTTTT'), createOptions);
            createOptions.differentiateStringsAndNumbers = isBoolean(options?.differentiateStringsAndNumbers) ? options.differentiateStringsAndNumbers : CONFIG.create.differentiateStringsAndNumbers;
        // }
        createOptions.throw = [ThrowOption.ERROR, ThrowOption.WARNING].includes(options?.throw) ? options.throw : CONFIG.create.throw;
        Reflect.defineMetadata('initialized', true, createOptions);
        // console.log(chalk.cyanBright('CREATTTT OPTTTTTT'), createOptions);
        return createOptions;
    }

}
