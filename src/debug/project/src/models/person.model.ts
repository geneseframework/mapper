import { Cat } from './cat.model';
import { Address } from './address.model';
import { Meaow } from './meaow.enum';
import { Mood } from './mood.enum';

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


    addCat(cat: Cat): void {
        this.cats.push(cat);
    }


    adopt(cat: Cat): Person {
        if (cat) {
            this.addCat(cat);
            this.isHappy = true;
            // cat.mood = Mood.HAPPY;
        } else {
            this.isHappy = false;
        }
        return this;
    }


    async giveFood(food: 'croquettes' | 'swill'): Promise<Meaow[]> {
        const meaows: Meaow[] = [];
        for (const cat of this.cats) {
            const meaow = await cat.eatFood(food);
            meaows.push(meaow);
        }
        return meaows;
    }

}


