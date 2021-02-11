import { Address } from './src/models/address.model';
import { Cat } from './src/models/cat.model';
import { Person } from './src/models/person.model';

export function createInstance(className: string): any {
    switch (className) {
        case 'Address':
            return new Address(undefined, undefined, undefined);
        case 'Cat':
            return new Cat(undefined, undefined, undefined);
        case 'Person':
            return new Person(undefined, undefined, undefined, undefined, undefined, undefined);
        default:
            return undefined;
    }
}
