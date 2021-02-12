import { Mood } from './mood.enum';
import { IAnimal } from './iAnimal.interface';
import { Person } from './person.model';
import { Color } from './colors.enum';

export class Cat implements IAnimal {

    age: number = undefined;
    colors: Color[] = [];
    friend: Person = undefined;
    hungry = false;
    tattoo: [string, number, Color, Person];
    mood: Mood = undefined;
    name: string = undefined;

    constructor(age: number, name: string) {
    // constructor(age: number, name: string, mood: Mood = Mood.SAD) {
        this.age = age;
        // this.mood = mood;
        this.name = name;
    }


    get numberOfLegs(): number {
        return 4;
    }
}

