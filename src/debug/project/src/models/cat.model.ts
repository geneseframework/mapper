import { Meaow } from './meaow.enum';
import { Mood } from './mood.enum';
import { IAnimal } from './iAnimal.interface';
import { Person } from './person.model';

export class Cat implements IAnimal {

    age: number = undefined;
    friend: Person = undefined;
    hungry = false;
    mood: Mood = undefined;
    name: string = undefined;

    constructor(age: number, name: string, mood: Mood = Mood.SAD) {
        this.age = age;
        this.mood = mood;
        this.name = name;
    }


    get numberOfLegs(): number {
        return 4;
    }


    meaow(): Meaow {
        return undefined;
        // let meaow: Meaow;
        // switch (this.mood) {
        //     case Mood.ANGRY:
        //         meaow = Meaow.ANGRY;
        //         break;
        //     case Mood.HAPPY:
        //         meaow = Meaow.HAPPY;
        //         break;
        //     case Mood.SAD:
        //         meaow = Meaow.SAD;
        //         break;
        //     default:
        //         meaow = Meaow.SAD;
        // }
        // return meaow;
    }


    async eatFood(food: 'croquettes' | 'swill'): Promise<Meaow> {
        if (this.hungry) {
            return food === 'croquettes' ? Meaow.HAPPY : Meaow.SAD;
        }
        if (food === 'croquettes') {
            // this.mood = Mood.HAPPY;
            return Meaow.HAPPY;
        } else {
            // this.mood = Mood.ANGRY;
            return Meaow.ANGRY;
        }
    }
}

