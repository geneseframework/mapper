import { Color } from '../models/colors.enum';


export const PERSON_LEO = {
    employer: {
        name: 'Total',
        employees: 30000
    },
    firstName: 'Léo',
    lastName: 'Renoir',
    cats: []
}

export const PERSON_AUGUSTE = {
    employer: {
        name: 'Himself'
    },
    firstName: 'Auguste',
    lastName: 'Renoir',
    cats: []
}

export const PERSON_PIERRE = {
    employer: {
        kind: 'actor'
    },
    firstName: 'Pierre',
    lastName: 'Renoir',
    cats: []
}

export const PERSON_LEA = {
    employer: {
        name: 'GreenPeace',
        volunteers: 3000
    },
    family: [PERSON_LEO, PERSON_AUGUSTE, PERSON_PIERRE],
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
}