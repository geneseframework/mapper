import { kuzzyTest } from '../test.service';
import { StringOrStrings } from '../../types/string-or-strings.type';

// type StringOrStrings = string | string[];
//
export class PersonWithNickNames {
    nickNames: StringOrStrings;
}

async function kzTest(): Promise<boolean> {
    return await kuzzyTest('data: string / propertyType: string | string[]', PersonWithNickNames, {nickNames: 'Auguste'});
}

kzTest()

    // it('data: string / propertyType: string | string[]', async () => {
    //     const data = { nickNames: 'Auguste' };
    //     console.log(chalk.blueBright('JEST DATAAAAA'), data);
    //     const response = await Mapper.create(PersonWithNickNames, data);
    //     const expectedResponse = new PersonWithNickNames();
    //     expectedResponse.nickNames = 'Auguste';
    //     console.log(chalk.blueBright('JEST RESPONSEEEEE'), response);
    //     expect(response).toEqual(expectedResponse);
    // });

// describe('Map classes with types', () => {
//
//     it('data: string / propertyType: string | string[]', async () => {
//         const data = { nickNames: 'Auguste' };
//         const response: PersonWithNickNames = await Mapper.create(PersonWithNickNames, data);
//         const expectedResponse = new PersonWithNickNames();
//         expectedResponse.nickNames = 'Auguste';
//         expect(response).toEqual(expectedResponse);
//     });
//
// });

