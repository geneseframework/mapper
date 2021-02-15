import { Mapper } from '../../models/mapper';

// type StringOrStrings = string | string[];
//
class PersonWithNickNames {
    nickNames;
}

    it('data: string / propertyType: string | string[]', async () => {
        const data = { nickNames: 'Auguste' };
        const response = await Mapper.create(PersonWithNickNames, data);
        const expectedResponse = new PersonWithNickNames();
        expectedResponse.nickNames = 'Auguste';
        expect(response).toEqual(expectedResponse);
    });

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

