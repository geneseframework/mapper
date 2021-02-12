import { Mood } from '../enums/mood.enum';
import { Person } from './person.model';
import { Color } from './colors.enum';
import { Animal } from './animal.model';
import { Prey } from '../interfaces/iAnimal.interface';
import { Race } from '../types/race.type';

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

