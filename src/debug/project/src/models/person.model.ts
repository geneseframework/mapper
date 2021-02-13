import { Cat } from './cat.model';
import { Address } from './address.model';
import { StringOrStrings } from '../types/string-or-strings.type';
import { Employer } from '../types/employer.type';

export class Person {

    public address: Address = undefined;
    public cats: Cat[] = [];
    public employer: Employer = undefined;
    public family: Person[] = [];
    public firstName: string = undefined;
    public isHappy: boolean;
    public lastName: string = undefined;
    public nickNames: StringOrStrings = undefined;

    constructor(firstName: string, lastName: string, address?: Address, isHappy = false, nickNames?: string, cats: Cat[] = []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cats = Array.isArray(cats) ? cats : [];
        this.address = address;
        this.isHappy = isHappy;
        this.nickNames = nickNames;
    }


}


