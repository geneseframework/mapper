import { Mood } from '../enums/mood.enum';
import { Person } from './person.model';
import { Color } from '../enums/colors.enum';
import { Animal } from './animal.model';
import { Race } from '../types/race.type';
import { Prey } from '../interfaces/prey.interface';

export class Cat extends Animal {

    colors: Color[] = [];
    favouritePrey: Prey = undefined;
    friend: Person = undefined;
    hungry = false;
    mood: Mood = undefined;
    name: string = undefined;
    race: Race = undefined;
    tattoo: [string, number, Color, Person];

    constructor(age: number, name: string, mood: Mood = Mood.SAD) {
        super('Cat');
        this.age = age;
        this.mood = mood;
        this.name = name;
    }

}

