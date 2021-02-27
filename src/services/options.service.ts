import { CreateOptions } from '../interfaces/create-options.interface';
import 'reflect-metadata';
import * as chalk from 'chalk';
import { isObjectButNotArray } from '../utils/objects.util';

export class OptionsService {


    static wasInitialized(options: CreateOptions): boolean {
        if (!isObjectButNotArray(options)) {
            return false;
        }
        console.log(chalk.magentaBright('WAS INITTTTT ?'), Reflect.hasMetadata('initialized', options));
        return Reflect.hasMetadata('initialized', options);
    }

    static initialize(options: CreateOptions = {}): CreateOptions {
        options.differentiateStringsAndNumbers = options.hasOwnProperty('differentiateStringsAndNumbers') ? options.differentiateStringsAndNumbers : true;
        Reflect.defineMetadata('initialized', true, options);
        console.log(chalk.magentaBright('WAS INITTTTT !!!'), Reflect.getMetadata('initialized', options), options);
        return options;
    }

}
