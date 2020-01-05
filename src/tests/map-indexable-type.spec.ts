import { GeneseMapper } from '..';
import { isSameObject } from '../services/tools.service';

describe('GENESE MAPPER _mapIndexableType', () => {
    const gmp = new GeneseMapper(Object);


    // **************************************************************************
    // _mapIndexableType
    // **************************************************************************

    const target = {
        gnIndexableType: {
            country: ''
        }
    };
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
    it('{gnIndexableType: {country: ""}}, countriesSource => {fr: {country: "Allemagne"}}', () => {
        expect(isSameObject(gmp._mapIndexableType(target, countriesSource), countriesSource))
            .toBeTruthy();
    });

});
