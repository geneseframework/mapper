import { Cat } from './cat.model';
import { Address } from './address.model';

export class Person {

    public address: Address = undefined;
    public cats: Cat[] = [];
    public firstName: string = undefined;
    public isHappy: boolean;
    public lastName: string = undefined;
    public socialNumber: string = undefined;

    constructor(firstName: string, lastName: string, address?: Address, isHappy = false, socialNumber?: string, cats: Cat[] = []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cats = Array.isArray(cats) ? cats : [];
        this.address = address;
        this.isHappy = isHappy;
        this.socialNumber = socialNumber;
    }



}


