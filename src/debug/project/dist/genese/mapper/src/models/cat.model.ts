// import { Meaow } from './meaow.enum';
// import { Mood } from './mood.enum';
// import { IAnimal } from './iAnimal.interface';
//
// export class Cat implements IAnimal {
//
//     age: number = undefined;
//     hungry = false;
//     isHealthy: boolean = true;
//     mood: Mood = undefined;
//     name: string = undefined;
//     weight: number = undefined;
//
//     constructor(age: number, name: string, mood: Mood = Mood.SAD) {
//         this.age = age;
//         this.mood = mood;
//         this.name = name;
//     }
//
//
//     get numberOfLegs(): number {
//         return 4;
//     }
//
//
//     getWeight(): number {
//         return this.weight;
//     }
//
//
//     meaow(): Meaow {
//         let meaow: Meaow;
//         switch (this.mood) {
//             case Mood.ANGRY:
//                 meaow = Meaow.ANGRY;
//                 break;
//             case Mood.HAPPY:
//                 meaow = Meaow.HAPPY;
//                 break;
//             case Mood.SAD:
//                 meaow = Meaow.SAD;
//                 break;
//             default:
//                 meaow = Meaow.SAD;
//         }
//         return meaow;
//     }
//
//
//     async eatFood(food: 'croquettes' | 'swill'): Promise<Meaow> {
//         if (this.hungry) {
//             return food === 'croquettes' ? Meaow.HAPPY : Meaow.SAD;
//         }
//         if (food === 'croquettes') {
//             this.mood = Mood.HAPPY;
//             return Meaow.HAPPY;
//         } else {
//             this.mood = Mood.ANGRY;
//             return Meaow.ANGRY;
//         }
//     }
// }
//
