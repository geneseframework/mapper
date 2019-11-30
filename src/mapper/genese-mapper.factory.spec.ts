import { Tools } from '../services/tools.service';
import {
    _areStringOrNumber,
    _castStringAndNumbers,
    _diveMap,
    _mapArrayOfObjects,
    _mapIndexableType,
    _mapNotPrimitive
} from './genese-mapper.factory';

describe('GENESE MAPPER FACTORY', () => {
    // const gmp = new GeneseMapperFactory(Object);


    // **************************************************************************
    // _areStringOrNumber
    // **************************************************************************

    describe('_areStringOrNumber', () => {

        it('1, undefined => false', () => {
            expect(_areStringOrNumber(1, undefined) === false).toBeTruthy();
        });

        it('undefined, 1 => false', () => {
            expect(_areStringOrNumber(undefined, 1) === false).toBeTruthy();
        });

        it('2, 1 => true', () => {
            expect(_areStringOrNumber(2, 1) === true).toBeTruthy();
        });

        it('2, "1" => true', () => {
            expect(_areStringOrNumber(2, '1') === true).toBeTruthy();
        });

        it('"2", 1 => true', () => {
            expect(_areStringOrNumber('2', 1) === true).toBeTruthy();
        });

        it('"2", "1" => true', () => {
            expect(_areStringOrNumber('2', '1') === true).toBeTruthy();
        });
    });

    // **************************************************************************
    // _castStringAndNumbers
    // **************************************************************************

    describe('_castStringAndNumbers', () => {

        it('undefined, {a: 1} => undefined', () => {
            expect(_castStringAndNumbers(undefined, {a: 1}) === undefined).toBeTruthy();
        });

        it('{a: 1}, undefined => undefined', () => {
            expect(_castStringAndNumbers({a: 1}, undefined) === undefined).toBeTruthy();
        });

        it('{a: 1}, null => undefined', () => {
            expect(_castStringAndNumbers({a: 1}, null) === undefined).toBeTruthy();
        });

        it('string1, string1 => string1', () => {
            expect(_castStringAndNumbers('string1', 'string1') === 'string1').toBeTruthy();
        });

        it('1, 1 => 1', () => {
            expect(_castStringAndNumbers(1, 1) === 1).toBeTruthy();
        });

        it('string1, string2 => string2', () => {
            expect(_castStringAndNumbers('string1', 'string2') === 'string2').toBeTruthy();
        });

        it('string1, 1 => "1"', () => {
            expect(_castStringAndNumbers('string1', 1) === '1').toBeTruthy();
        });

        it('2, "1" => 1', () => {
            expect(_castStringAndNumbers(2, '1') === 1).toBeTruthy();
        });

        it('{a: 1}, {a: 2} => undefined', () => {
            expect(_castStringAndNumbers({a: 1}, {a: 2}) === undefined).toBeTruthy();
        });

        it('{a: 1}, {a: 1} => {a: 1}', () => {
            expect(_castStringAndNumbers({a: 1}, {a: 1}) === undefined).toBeTruthy();
        });

        it('{a: 1}, {a: 2} => true', () => {
            expect(_castStringAndNumbers({a: 1}, {a: 2}) === undefined).toBeTruthy();
        });
    });

    // **************************************************************************
    // _diveMap
    // **************************************************************************

    describe('_diveMap', () => {

        describe('primitives', () => {

            it('true, true => true', () => {
                expect(_diveMap(true, true) === true).toBeTruthy();
            });

            it('true, false => false', () => {
                expect(_diveMap(true, false) === false).toBeTruthy();
            });

            it('string1, 1 => "1"', () => {
                expect(_diveMap('string1', 1) === '1').toBeTruthy();
            });

            it('true, null => null', () => {
                expect(_diveMap(true, null) === null).toBeTruthy();
            });

            it('string1, {a: 1} => string1', () => {
                expect(_diveMap('string1', {a: 1}) === 'string1').toBeTruthy();
            });
        });

        // **************************************************************************

        describe('not primitives', () => {

            it('{a: 1}, null => null', () => {
                expect(_diveMap({a: 1}, null) === null).toBeTruthy();
            });

            it('{a: 1}, undefined => {a: 1}', () => {
                expect(Tools.isSameObject(_diveMap({a: 1}, undefined), {a: 1})).toBeTruthy();
            });

            it('{a: 1}, {a: 1} => {a: 1}', () => {
                expect(Tools.isSameObject(_diveMap({a: 1}, {a: 1}), {a: 1})).toBeTruthy();
            });

            it('{a: ""}, {a: "1"} => {a: "1"}', async () => {
                expect(Tools.isSameObject(_diveMap({a: ''}, {a: '1'}), {a: '1'})).toBeTruthy();
            });

            it('{a: 1}, {} => {a: 1}', () => {
                expect(Tools.isSameObject(_diveMap({a: 1}, {}), {a: 1})).toBeTruthy();
            });

            it('{a: 1}, {a: 2} => {a: 2}', () => {
                expect(Tools.isSameObject(_diveMap({a: 1}, {a: 2}), {a: 2})).toBeTruthy();
            });

            it('{a: 1}, {a: null} => {a: null}', () => {
                expect(Tools.isSameObject(_diveMap({a: 1}, {a: null}), {a: null})).toBeTruthy();
            });

            it('{country: ""}, {country: "Allemagne"} => {country: "Allemagne"}', () => {
                expect(Tools.isSameObject(_diveMap({country: ''}, {country: 'Allemagne'}), {country: 'Allemagne'})).toBeTruthy();
            });
        });
    });


    // **************************************************************************
    // _mapArrayOfObjects
    // **************************************************************************


    describe('_mapArrayOfObjects', () => {

        it('[{a: 1}], undefined => undefined', () => {
            expect(_mapArrayOfObjects([{a: 1}], undefined) === undefined).toBeTruthy();
        });

        it('undefined, [{a: 1}] => undefined', () => {
            expect(_mapArrayOfObjects(undefined, [{a: 1}]) === undefined).toBeTruthy();
        });

        it('[], [{a: 1}] => undefined', () => {
            expect(_mapArrayOfObjects([], [{a: 1}]) === undefined).toBeTruthy();
        });

        it('[{a: 1}], [{a: 1}] => [{a: 1}]', () => {
            expect(Tools.isSameObject(_mapArrayOfObjects([{a: 1}], [{a: 1}]), [{a: 1}])).toBeTruthy();
        });

        it('[{a: 1}], [{a: 1}] => [{a: 1}]', () => {
            expect(Tools.isSameObject(_mapArrayOfObjects([{a: 1}], [{a: 1}]), [{a: 1}])).toBeTruthy();
        });
    });


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

    describe('_mapIndexableType', () => {

        it('undefined, {a: 1} => undefined', () => {
            expect(_mapIndexableType(undefined, {a: 1}) === undefined).toBeTruthy();
        });

        it('{gnIndexableType: {a: 1}}, undefined => {a: 1}', () => {
            expect(Tools.isSameObject(_mapIndexableType({a: 1}, undefined), {a: 1})).toBeTruthy();
        });

        it('{a: 1}, null => null', () => {
            expect(_mapIndexableType({a: 1}, null) === null).toBeTruthy();
        });

        it('{country: ""}, countriesSource => {fr: {country: "Allemagne"}}', () => {
            expect(Tools.isSameObject(_mapIndexableType({country: ''}, countriesSource), countriesSource))
                .toBeTruthy();
        });

    });


    // **************************************************************************
    // _mapNotPrimitive
    // **************************************************************************


    describe('_mapNotPrimitive', () => {

        it('{a: 1}, undefined => undefined', () => {
            expect(Tools.isSameObject(_mapNotPrimitive({a: 1}, undefined), {a: 1})).toBeTruthy();
        });

        it('{a: 1}, null => null', () => {
            expect(_mapNotPrimitive({a: 1}, null) === null).toBeTruthy();
        });

        it('{a: 1}, {a: null} => {a: null}', () => {
            expect(Tools.isSameObject(_mapNotPrimitive({a: 1}, {a: null}), {a: null})).toBeTruthy();
        });

        it('{a: 1}, {a: 1} => {a: 1}', () => {
            expect(Tools.isSameObject(_mapNotPrimitive({a: 1}, {a: 1}), {a: 1})).toBeTruthy();
        });

        it('{a: 1}, {} => {a: 1}', () => {
            expect(Tools.isSameObject(_mapNotPrimitive({a: 1}, {}), {a: 1})).toBeTruthy();
        });

        it('{a: 1}, {a: 2} => {a: 2}', () => {
            expect(Tools.isSameObject(_mapNotPrimitive({a: 1}, {a: 2}), {a: 2})).toBeTruthy();
        });

        it('{a: {b: 1}}, {a: {b: 2}} => {a: {b: 2}}', () => {
            expect(Tools.isSameObject(_mapNotPrimitive({a: {b: 1}}, {a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
        });

        it('{a: [1]}, {a: {b: 2}} => {a: [1]}', () => {
            expect(Tools.isSameObject(_mapNotPrimitive({a: [1]}, {a: {b: 2}}), {a: [1]})).toBeTruthy();
        });

    });

});
