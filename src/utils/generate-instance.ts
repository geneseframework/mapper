import { Address } from '../debug/project/src/models/address.model';
import { Cat } from '../debug/project/src/models/cat.model';
import { Person } from '../debug/project/src/models/person.model';
import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';

export function generateInstance<T>(instanceGenerator: InstanceGenerator<T>): T {
    let instance: any;
    // console.log(chalk.magentaBright('INSTANCE GENERATORRRRRR'), instanceGenerator);
    console.log(chalk.greenBright('INSTANCE GENERATORRRRRR id'), instanceGenerator.id);
    switch (instanceGenerator.id) {
        case 'Address':
            instance = new Address(undefined, undefined, undefined);
            break;
        case 'Cat_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/cat.model.ts':
            instance = new Cat(undefined, undefined, undefined);
            break;
        case 'Color_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/colors.enum.ts':
            instance = undefined;
            break;
        case 'Person_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/person.model.ts':
            instance = new Person(undefined, undefined, undefined, undefined, undefined, undefined);
            break;
        default:
            console.log(chalk.yellowBright('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
            instance = undefined;
    }
    return instance;
}
