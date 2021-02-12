import { Address } from '../debug/project/src/models/address.model';
import { Cat } from '../debug/project/src/models/cat.model';
import { Person } from '../debug/project/src/models/person.model';

export function generateInstance(className: string): any {
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
