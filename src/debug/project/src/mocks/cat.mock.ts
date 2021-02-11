import { Color } from '../models/colors.enum';

export const CAT_DATA: any = {
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
    unknownProperty: 'unknown'
}
