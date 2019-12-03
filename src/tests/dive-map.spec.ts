import { GeneseMapper } from '..';
import { isSameObject } from '../services/tools.service';

describe('GENESE MAPPER _diveMap', () => {
    const gmp = new GeneseMapper(Object);


    // **************************************************************************
    // _diveMap
    // **************************************************************************

    describe('primitives', () => {

        it('true, true => true', () => {
            expect(gmp._diveMap(true, true) === true).toBeTruthy();
        });

        it('true, false => false', () => {
            expect(gmp._diveMap(true, false) === false).toBeTruthy();
        });

        it('string1, 1 => "1"', () => {
            expect(gmp._diveMap('string1', 1) === '1').toBeTruthy();
        });

        it('true, null => null', () => {
            expect(gmp._diveMap(true, null) === null).toBeTruthy();
        });

        it('string1, {a: 1} => string1', () => {
            expect(gmp._diveMap('string1', {a: 1}) === 'string1').toBeTruthy();
        });
    });

    // **************************************************************************

    describe('not primitives', () => {

        it('{a: 1}, null => null', () => {
            expect(gmp._diveMap({a: 1}, null) === null).toBeTruthy();
        });

        it('{a: 1}, undefined => {a: 1}', () => {
            expect(isSameObject(gmp._diveMap({a: 1}, undefined), {a: 1})).toBeTruthy();
        });

        it('{a: 1}, {a: 1} => {a: 1}', () => {
            expect(isSameObject(gmp._diveMap({a: 1}, {a: 1}), {a: 1})).toBeTruthy();
        });

        it('{a: ""}, {a: "1"} => {a: "1"}', async () => {
            expect(isSameObject(gmp._diveMap({a: ''}, {a: '1'}), {a: '1'})).toBeTruthy();
        });

        it('{a: 1}, {} => {a: 1}', () => {
            expect(isSameObject(gmp._diveMap({a: 1}, {}), {a: 1})).toBeTruthy();
        });

        it('{a: 1}, {a: 2} => {a: 2}', () => {
            expect(isSameObject(gmp._diveMap({a: 1}, {a: 2}), {a: 2})).toBeTruthy();
        });

        it('{a: 1}, {a: null} => {a: null}', () => {
            expect(isSameObject(gmp._diveMap({a: 1}, {a: null}), {a: null})).toBeTruthy();
        });

        it('{country: ""}, {country: "Allemagne"} => {country: "Allemagne"}', () => {
            expect(isSameObject(gmp._diveMap({country: ''}, {country: 'Allemagne'}), {country: 'Allemagne'})).toBeTruthy();
        });
    });

});
