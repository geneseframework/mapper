import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';
import { Address } from "../debug/project/src/models/address.model";
import { Animal } from "../debug/project/src/models/animal.model";
import { Cat } from "../debug/project/src/models/cat.model";
import { MainAppProcess } from "../debug/project/src/models/main-app-process";
import { Person } from "../debug/project/src/models/person.model";
import { Company } from "../debug/project/src/models/company.model";
import { Ngo } from "../debug/project/src/models/ngo.model";
import { ColorClassSpec, ColorsClassSpec } from "../debug/project/src/tests/enums.spec";
import { Mapper } from "../models/mapper";
import { AnimalOwner } from "../debug/project/src/tests/interfaces.spec";
import { TupleClassSpec } from "../debug/project/src/tests/tuple.spec";
import { CatSpec, OutOfProjectSpec, PersonCatSpec } from "../debug/project/src/tests/classes.spec";
import { NgoSpec, CompanySpec, PersonSpec, NickNamesSpec, PersonWithNickNamesStringsOrString, LevelClassSpec } from "../debug/project/src/tests/types.spec";
import { Global } from "../models/global.model";
import { FlagService } from "../services/flag.service";
import { InitService } from "../services/init.service";
import { MapArrayService } from "../services/map-array.service";
import { MapDeclarationService } from "../services/map-declaration.service";
import { MapEnumService } from "../services/map-enum.service";
import { MapInstanceOrInterfaceService } from "../services/map-instance-or-interface.service";
import { MapInstanceService } from "../services/map-instance.service";
import { MapInterfaceService } from "../services/map-interface.service";
import { MapPrimitiveService } from "../services/map-primitive.service";
import { MapPropertyService } from "../services/map-property.service";
import { MapTupleService } from "../services/map-tuple.service";
import { MapTypeService } from "../services/map-type.service";
import { TestMapper } from "../test-engine/test-mapper.model";

export function generateInstance<T>(instanceGenerator: InstanceGenerator<T>): T {
    let instance: any;
    switch (instanceGenerator.id) {
        case 'Global_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/models/global.model.ts':
            instance = new Global();
            break;
        case 'InstanceGenerator_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/models/instance-generator.model.ts':
            instance = new InstanceGenerator(undefined, undefined, undefined);
            break;
        case 'Mapper_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/models/mapper.ts':
            instance = new Mapper();
            break;
        case 'FlagService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/flag.service.ts':
            instance = new FlagService();
            break;
        case 'InitService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/init.service.ts':
            instance = new InitService();
            break;
        case 'MapArrayService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-array.service.ts':
            instance = new MapArrayService();
            break;
        case 'MapDeclarationService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-declaration.service.ts':
            instance = new MapDeclarationService();
            break;
        case 'MapEnumService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-enum.service.ts':
            instance = new MapEnumService();
            break;
        case 'MapInstanceOrInterfaceService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-instance-or-interface.service.ts':
            instance = new MapInstanceOrInterfaceService();
            break;
        case 'MapInstanceService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-instance.service.ts':
            instance = new MapInstanceService();
            break;
        case 'MapInterfaceService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-interface.service.ts':
            instance = new MapInterfaceService();
            break;
        case 'MapPrimitiveService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-primitive.service.ts':
            instance = new MapPrimitiveService();
            break;
        case 'MapPropertyService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-property.service.ts':
            instance = new MapPropertyService();
            break;
        case 'MapTupleService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-tuple.service.ts':
            instance = new MapTupleService();
            break;
        case 'MapTypeService_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/services/map-type.service.ts':
            instance = new MapTypeService();
            break;
        case 'TestMapper_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/test-engine/test-mapper.model.ts':
            instance = new TestMapper(undefined, undefined, undefined, undefined);
            break;
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
        case 'CatSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
            instance = new CatSpec();
            break;
        case 'PersonCatSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
            instance = new PersonCatSpec();
            break;
        case 'OutOfProjectSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
            instance = new OutOfProjectSpec();
            break;
        case 'ColorClassSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts':
            instance = new ColorClassSpec();
            break;
        case 'ColorsClassSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts':
            instance = new ColorsClassSpec();
            break;
        case 'AnimalOwner_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/interfaces.spec.ts':
            instance = new AnimalOwner();
            break;
        case 'TupleClassSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts':
            instance = new TupleClassSpec();
            break;
        case 'NgoSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
            instance = new NgoSpec();
            break;
        case 'CompanySpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
            instance = new CompanySpec();
            break;
        case 'PersonSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
            instance = new PersonSpec();
            break;
        case 'NickNamesSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
            instance = new NickNamesSpec();
            break;
        case 'PersonWithNickNamesStringsOrString_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
            instance = new PersonWithNickNamesStringsOrString();
            break;
        case 'LevelClassSpec_/users/utilisateur/documents/perso_gilles_fabre/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
            instance = new LevelClassSpec();
            break;
        default:
            console.log(chalk.yellow('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
            instance = undefined;
        }
    return instance;
}
