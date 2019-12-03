import { GeneseMapper } from '../mapper/genese.mapper';
import { isSameObject } from '../services/tools.service';

describe('GENESE MAPPER _mapArrayOfObjects', () => {
    const gmp = new GeneseMapper(Object);


    // **************************************************************************
    // _mapArrayOfObjects
    // **************************************************************************



    it('[{a: 1}], undefined => undefined', () => {
        expect(gmp._mapArrayOfObjects([{a: 1}], undefined) === undefined).toBeTruthy();
    });

    it('undefined, [{a: 1}] => undefined', () => {
        expect(gmp._mapArrayOfObjects(undefined, [{a: 1}]) === undefined).toBeTruthy();
    });

    it('[], [{a: 1}] => undefined', () => {
        expect(gmp._mapArrayOfObjects([], [{a: 1}]) === undefined).toBeTruthy();
    });

    it('[{a: 1}], [{a: 1}] => [{a: 1}]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([{a: 1}], [{a: 1}]), [{a: 1}])).toBeTruthy();
    });

    it('[{a: 1}], [{a: 1}] => [{a: 1}]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([{a: 1}], [{a: 1}]), [{a: 1}])).toBeTruthy();
    });

});
