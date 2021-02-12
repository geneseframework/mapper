import { Color } from '../models/colors.enum';

export const CAT_DATA_0: any = {
    age: 4,
    colors: [Color.WHITE, Color.BLACK],
    favouritePrey: {
        animal: {
            kind: 'Mouse',
            order: 'vertebrate'
        }
    },
    friend: {
        firstName: 'Léa',
        lastName: 'Renoir',
        cats: [
            {
                age: 7,
                colors: [Color.RED],
                name: 'Taka',
                race: 'British short hair'
            },
            {
                age: 4,
                colors: [Color.WHITE, Color.BLACK],
                favouritePrey: {
                    animal: {
                        kind: 'Fly',
                        order: 'invertebrate'
                    }
                },
                name: 'Cibi',
                race: 'European'
            },
            {
                unknowProp: 0
            }
        ]
    },
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
    friend: {
        firstName: 'Léa',
        lastName: 'Renoir',
        cats: [
            {
                age: 7,
                colors: [Color.RED],
                name: 'Taka',
                race: 'British short hair'
            },
            {
                age: 4,
                colors: [Color.WHITE, Color.BLACK],
                name: 'Biela',
                race: 'European'
            }
        ]
    },
    hungry: true,
    mood: 'happy',
    name: 'Cibi',
    race: 'European',
    tattoo: ['Jef', 873, Color.BLACK, { firstName: 'Léo', lastName: 'Renoir' }],
}
