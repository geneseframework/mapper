import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';
import { Address } from "../debug/project/src/models/address.model";
import { Animal } from "../debug/project/src/models/animal.model";
import { Cat } from "../debug/project/src/models/cat.model";
import { MainAppProcess } from "../debug/project/src/models/main-app-process";
import { Person } from "../debug/project/src/models/person.model";
import { Company } from "../debug/project/src/models/company.model";
import { Ngo } from "../debug/project/src/models/ngo.model";
import { PersonWithNickNames } from "../debug/project/src/tests/classes/map-class-types.test";

export function generateInstance<T>(instanceGenerator: InstanceGenerator<T>): T {
    let instance: any;
    switch (instanceGenerator.id) {
        case 'Address_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/address.model.ts':
            instance = new Address(undefined, undefined, undefined);
            break;
        case 'Animal_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/animal.model.ts':
            instance = new Animal(undefined);
            break;
        case 'Cat_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/cat.model.ts':
            instance = new Cat(undefined, undefined, undefined);
            break;
        case 'Company_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/company.model.ts':
            instance = new Company();
            break;
        case 'MainAppProcess_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/main-app-process.ts':
            instance = new MainAppProcess();
            break;
        case 'Ngo_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/ngo.model.ts':
            instance = new Ngo();
            break;
        case 'Person_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/models/person.model.ts':
            instance = new Person(undefined, undefined, undefined, undefined, undefined, undefined);
            break;
        case 'PersonWithNickNames_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/classes/map-class-types.test.ts':
            instance = new PersonWithNickNames();
            break;
        default:
            console.log(chalk.yellow('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
            instance = undefined;
        }
    return instance;
}
