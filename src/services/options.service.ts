import { CreateOptions } from '../models/create-options.model';
import 'reflect-metadata';
import { isObjectWhichIsNotArray } from '../utils/native/objects.util';
import { CONFIG } from '../const/config.const';
import { ThrowOption } from '../enums/throw-option.enum';

export class OptionsService {


    static wasInitialized(options: CreateOptions): boolean {
        if (!isObjectWhichIsNotArray(options)) {
            return false;
        }
        return Reflect.hasMetadata('initialized', options);
    }


    static initialize(options: CreateOptions): CreateOptions {
        const createOptions = new CreateOptions();
        if (!options) {
            return createOptions;
        }
        if (![true, false].includes(options?.differentiateStringsAndNumbers)){
            createOptions.differentiateStringsAndNumbers = CONFIG.create.differentiateStringsAndNumbers;
        }
        createOptions.throw = [ThrowOption.ERROR, ThrowOption.WARNING].includes(options?.throw) ? options.throw : CONFIG.create.throw;
        Reflect.defineMetadata('initialized', true, createOptions);
        return createOptions;
    }

}
