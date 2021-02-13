import { Color } from '../models/colors.enum';
import { PERSON_LEA } from './person.data';

export const CAT_DATA_0: any = {
    age: 4,
    colors: [Color.WHITE, Color.BLACK],
    favouritePrey: {
        animal: {
            kind: 'Mouse',
            order: 'vertebrate'
        }
    },
    friend: PERSON_LEA,
    hungry: false,
    mood: 'happy',
    name: 'Biela',
    race: 'European',
    tattoo: ['Jef', 872, Color.BLACK, { firstName: 'Léo', lastName: 'Renoir' }],
    unknownProperty: 'unknown'
}


export const CAT_DATA_1: any = {
    age: 4,
    colors: [Color.WHITE, Color.BLACK],
    friend: PERSON_LEA,
    hungry: true,
    mood: 'happy',
    name: 'Cibi',
    race: 'European',
    tattoo: ['Jef', 873, Color.BLACK, { firstName: 'Léo', lastName: 'Renoir' }],
}
