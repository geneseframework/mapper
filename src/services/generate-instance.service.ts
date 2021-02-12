// import { TConstructor } from '../models/t-constructor.model';
// import { Cat } from '../debug/project/src/models/cat.model';
// import { InstanceGenerator } from '../models/instance-generator.model';
// import * as chalk from 'chalk';
// import { Address } from '../debug/project/src/models/address.model';
// import { Person } from '../debug/project/src/models/person.model';
//
// export class GenerateInstanceService {
//
//     static generateInstance<T>(instanceGenerator: InstanceGenerator<T>): T {
//         let instance: any;
//         console.log(chalk.magentaBright('INSTANCE GENERATORRRRRR'), instanceGenerator);
//         console.log(chalk.greenBright('INSTANCE GENERATORRRRRR id'), instanceGenerator.id);
//         switch (instanceGenerator.id) {
//             case 'Address':
//                 instance = new Address(undefined, undefined, undefined);
//             case 'Cat':
//                 instance = new Cat(undefined, undefined, undefined);
//             case 'Person':
//                 instance = new Person(undefined, undefined, undefined, undefined, undefined, undefined);
//             case 'insta Cat':
//                 instance = new Cat(undefined, undefined, undefined);
//                 break;
//             default:
//                 return undefined;
//         }
//         return instance as T;
//     }
//
// }
