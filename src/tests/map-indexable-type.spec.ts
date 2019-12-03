import { GeneseMapper } from '..';
import { isSameObject } from '../services/tools.service';

describe('GENESE MAPPER _mapIndexableType', () => {
    const gmp = new GeneseMapper(Object);


    // **************************************************************************
    // _mapIndexableType
    // **************************************************************************

    const countriesSource = {
        fr: {
            country: 'Allemagne'
        },
        en: {
            country: 'Germany'
        }
    };

    it('undefined, {a: 1} => undefined', () => {
        expect(gmp._mapIndexableType(undefined, {a: 1}) === undefined).toBeTruthy();
    });

    it('{gnIndexableType: {a: 1}}, undefined => {a: 1}', () => {
        expect(isSameObject(gmp._mapIndexableType({a: 1}, undefined), {a: 1})).toBeTruthy();
    });

    it('{a: 1}, null => null', () => {
        expect(gmp._mapIndexableType({a: 1}, null) === null).toBeTruthy();
    });

    it('{country: ""}, countriesSource => {fr: {country: "Allemagne"}}', () => {
        expect(isSameObject(gmp._mapIndexableType({country: ''}, countriesSource), countriesSource))
            .toBeTruthy();
    });

});
