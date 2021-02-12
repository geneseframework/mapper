import { Address } from '../debug/project/src/models/address.model';
import { Cat } from '../debug/project/src/models/cat.model';
import { Person } from '../debug/project/src/models/person.model';
import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';
import { MainAppProcess } from "../debug/project/src/models/main-app-process";

export function generateInstance<T>(instanceGenerator: InstanceGenerator<T>): T {
    let instance: any;
    switch (instanceGenerator.id) {
        case 'Address':
            instance = new Address(undefined, undefined, undefined);
            break;
        case 'Cat':
            instance = new Cat(undefined, undefined, undefined);
            break;
        case 'MainAppProcess':
            instance = new MainAppProcess();
            break;
        case 'Person':
            instance = new Person(undefined, undefined, undefined, undefined, undefined, undefined);
            break;
        default:
            console.log(chalk.yellowBright('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
            instance = undefined;
        }
    return instance;
}
