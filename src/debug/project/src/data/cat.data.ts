import { Color } from '../models/colors.enum';

export const CAT_DATA_0: any = {
    age: 4,
    colors: [Color.WHITE, Color.BLACK],
    friend: {
        firstName: 'Léa',
        lastName: 'Renoir',
        cats: [
            {
                age: 7,
                colors: [Color.RED],
                name: 'Taka'
            },
            {
                age: 4,
                colors: [Color.WHITE, Color.BLACK],
                name: 'Cibi'
            },
            {
                unknowProp: 0
            }
        ]
    },
    hungry: false,
    mood: 'happy',
    name: 'Biela',
    tattoo: ['Jef', 872, Color.BLACK, { firstName: 'Léo', lastName: 'Renoir' }],
    unknownProperty: 'unknown'
}


export const CAT_DATA_1: any = {
    age: 4,
    colors: [Color.WHITE, Color.BLACK],
    friend: {
        firstName: 'Léa',
        lastName: 'Renoir',
        cats: [
            {
                age: 7,
                colors: [Color.RED],
                name: 'Taka'
            },
            {
                age: 4,
                colors: [Color.WHITE, Color.BLACK],
                name: 'Biela'
            },
            {
                unknowProp: 0
            }
        ]
    },
    hungry: true,
    mood: 'happy',
    name: 'Cibi',
    tattoo: ['Jef', 873, Color.BLACK, { firstName: 'Léo', lastName: 'Renoir' }],
}
