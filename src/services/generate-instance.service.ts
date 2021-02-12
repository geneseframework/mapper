import { TConstructor } from '../models/t-constructor.model';
import { Cat } from '../debug/project/src/models/cat.model';
import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';

export class GenerateInstanceService {

    static generateInstance<T>(instanceGenerator: InstanceGenerator<T>): T {
        let instance: any;
        console.log(chalk.magentaBright('INSTANCE GENERATORRRRRR'), instanceGenerator);
        switch (instanceGenerator.id) {
            case 'insta Cat':
                instance = new Cat(undefined, undefined, undefined);
                break;
            default:
                return undefined;
        }
        return instance as T;
    }

}
