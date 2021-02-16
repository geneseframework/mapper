import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';
import { Address } from "../debug/project/src/models/address.model";
import { Animal } from "../debug/project/src/models/animal.model";
import { Cat } from "../debug/project/src/models/cat.model";
import { MainAppProcess } from "../debug/project/src/models/main-app-process";
import { Person } from "../debug/project/src/models/person.model";
import { Company } from "../debug/project/src/models/company.model";
import { Ngo } from "../debug/project/src/models/ngo.model";
import { TestMapper } from "../test-engine/test-mapper.model";
import { NickNamesSpec, PersonWithNickNamesStringsOrString } from "../debug/project/src/tests/string-or-strings.spec";
import { ColorClassSpec, ColorsClassSpec } from "../debug/project/src/tests/enums.spec";
import { NgoSpec, CompanySpec, PersonSpec } from "../debug/project/src/tests/types-of-classes.spec";

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
        case 'ColorClassSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts':
            instance = new ColorClassSpec();
            break;
        case 'ColorsClassSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts':
            instance = new ColorsClassSpec();
            break;
        case 'NickNamesSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/string-or-strings.spec.ts':
            instance = new NickNamesSpec();
            break;
        case 'PersonWithNickNamesStringsOrString_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/string-or-strings.spec.ts':
            instance = new PersonWithNickNamesStringsOrString();
            break;
        case 'NgoSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types-of-classes.spec.ts':
            instance = new NgoSpec();
            break;
        case 'CompanySpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types-of-classes.spec.ts':
            instance = new CompanySpec();
            break;
        case 'PersonSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types-of-classes.spec.ts':
            instance = new PersonSpec();
            break;
        default:
            console.log(chalk.yellow('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
            instance = undefined;
        }
    return instance;
}
