import { CreateOptions } from '../interfaces/create-options.interface';
import 'reflect-metadata';
import { isObjectWhichIsNotArray } from '../utils/native/objects.util';
import { CONFIG } from '../const/config.const';

export class OptionsService {


    static wasInitialized(options: CreateOptions): boolean {
        if (!isObjectWhichIsNotArray(options)) {
            return false;
        }
        return Reflect.hasMetadata('initialized', options);
    }

    static initialize(options: CreateOptions = {}): CreateOptions {
        if (![true, false].includes(options?.differentiateStringsAndNumbers)){
            options.differentiateStringsAndNumbers = CONFIG.create.differentiateStringsAndNumbers;
        }
        Reflect.defineMetadata('initialized', true, options);
        return options;
    }

}
