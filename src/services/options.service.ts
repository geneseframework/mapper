import { CreateOptions } from '../interfaces/create-options.interface';
import 'reflect-metadata';
import { isObjectButNotArray } from '../utils/objects.util';
import { InitConfigService } from './init-config.service';

export class OptionsService {


    static wasInitialized(options: CreateOptions): boolean {
        if (!isObjectButNotArray(options)) {
            return false;
        }
        return Reflect.hasMetadata('initialized', options);
    }

    static async initialize(options: CreateOptions = {}): Promise<CreateOptions> {
        options.differentiateStringsAndNumbers = options.hasOwnProperty('differentiateStringsAndNumbers') ? options.differentiateStringsAndNumbers : true;
        Reflect.defineMetadata('initialized', true, options);
        return options;
    }


    private static getOption(name: string, options: CreateOptions): void {

    }

}
