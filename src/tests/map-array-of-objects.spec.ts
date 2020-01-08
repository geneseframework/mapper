import { GeneseMapper } from '../mapper/genese.mapper';
import { isSameObject } from '../services/tools.service';

describe('GENESE MAPPER _mapArray', () => {

    // **************************************************************************
    // objects
    // **************************************************************************

    describe('map array of objects', () => {

        const gmp = new GeneseMapper(Object);

        it('[{a: 1}], undefined => [{a: 1}]', () => {
            expect(isSameObject(gmp._mapArray([{a: 1}], undefined), [{a: 1}])).toBeTruthy();
        });

        it('[{a: 1}], null => []', () => {
            expect(isSameObject(gmp._mapArray([{a: 1}], null), null)).toBeTruthy();
        });

        it('undefined, [{a: 1}] => undefined', () => {
            expect(gmp._mapArray(undefined, [{a: 1}]) === undefined).toBeTruthy();
        });

        it('[], [{a: 1}] => undefined', () => {
            expect(gmp._mapArray([], [{a: 1}]) === undefined).toBeTruthy();
        });

        it('[{a: 1}], [{a: 1}] => [{a: 1}]', () => {
            expect(isSameObject(gmp._mapArray([{a: 1}], [{a: 1}]), [{a: 1}])).toBeTruthy();
        });

        it('[{a: 1}], [{a: 1}] => [{a: 1}]', () => {
            expect(isSameObject(gmp._mapArray([{a: 1}], [{a: 1}]), [{a: 1}])).toBeTruthy();
        });

        it('[[{a: 1}, {b: 2}], [{c: 3}]], [{a: 1}] => [[{a: 1}, {b: 2}], [{c: 3}]], [{a: 1}]', () => {
            expect(isSameObject(gmp._mapArray([[{a: 0}]], [[{a: 1}, {b: 2}], [{c: 3}]]),
                [[{a: 1}, {a: 0}], [{a: 0}]])).toBeTruthy();
        });

        it('[[{a: 0}]], [{a: 1}, {a: 2}] => [[{a: 0}]]', () => {
            expect(isSameObject(gmp._mapArray([[{a: 0}]], [{a: 1}, {a: 2}]),
                [[{a: 0}]])).toBeTruthy();
        });

        it('[[{a: 0}]], [[{a: 1}, {a: 2}], []] => [[{a: 1}, {a: 2}], []]', () => {
            expect(isSameObject(gmp._mapArray([[{a: 0}]], [[{a: 1}, {a: 2}], []]),
                [[{a: 1}, {a: 2}], []])).toBeTruthy();
        });

        it('[[{a: 0}]], [[{a: 1}, {a: 2}], null]] => [[{a: 1}, {a: 2}], null]]', () => {
            expect(isSameObject(gmp._mapArray([[{a: 0}]], [[{a: 1}, {a: 2}], null]),
                [[{a: 1}, {a: 2}], null])).toBeTruthy();
        });

        it('[[{a: 0}]], [[{a: 1}, {a: 2}], undefined] => [[{a: 1}, {a: 2}], [{a: 0}]]', () => {
            expect(isSameObject(gmp._mapArray([[{a: 0}]], [[{a: 1}, {a: 2}], undefined]),
                [[{a: 1}, {a: 2}], [{a: 0}]])).toBeTruthy();
        });

        it('[[[{a: 0}]]], [[{a: 1}]] => [[[{a: 0}]]]', () => {
            expect(isSameObject(gmp._mapArray([[[{a: 0}]]], [[{a: 1}]]),
                [[[{a: 0}]]])).toBeTruthy();
        });

        it('[[[{a: 0}]]], [[{a: 1}, {a: 2}]] => [[[{a: 0}]]]', () => {
            expect(isSameObject(gmp._mapArray([[[{a: 0}]]], [[{a: 1}, {a: 2}]]),
                [[[{a: 0}]]])).toBeTruthy();
        });
    });

    // **************************************************************************
    // primitives
    // **************************************************************************

    describe('map array of primitives', () => {

        describe('map array of strings', () => {

            const gmp = new GeneseMapper(String);

            it('[""], ["a"] => ["a"]', () => {
                expect(isSameObject(gmp._mapArray([''], ['a']), ['a'])).toBeTruthy();
            });

            it('[""], [""] => [""]', () => {
                expect(isSameObject(gmp._mapArray([''], ['']), [''])).toBeTruthy();
            });

            it('[""], [] => []', () => {
                expect(isSameObject(gmp._mapArray([''], []), [])).toBeTruthy();
            });

            it('[[""]], [["a"]] => [["a"]]', () => {
                expect(isSameObject(gmp._mapArray([['']], [['a']]), [['a']])).toBeTruthy();
            });

            it('[[""]], [["a", "b"]] => [["a", "b"]]', () => {
                expect(isSameObject(gmp._mapArray([['']], [['a', 'b']]), [['a', 'b']])).toBeTruthy();
            });

            it('[[""]], [["a", "b"], []] => [["a", "b"], []]', () => {
                expect(isSameObject(gmp._mapArray([['']], [['a', 'b'], []]), [['a', 'b'], []])).toBeTruthy();
            });

            it('[[""]], [["a", "b"], ["c"]] => [["a", "b"], ["c"]]', () => {
                expect(isSameObject(gmp._mapArray([['']], [['a', 'b'], ['c']]), [['a', 'b'], ['c']])).toBeTruthy();
            });

            it('[[""]], [["a", "b"], null] => [["a", "b"], null]', () => {
                expect(isSameObject(gmp._mapArray([['']], [['a', 'b'], null]), [['a', 'b'], null])).toBeTruthy();
            });
        });


        // **************************************************************************


        describe('map array of numbers', () => {

            const gmp = new GeneseMapper(Number);

            it('[0], [3] => [3]', () => {
                expect(isSameObject(gmp._mapArray([0], [3]), [3])).toBeTruthy();
            });

            it('[[0]], [[2, 3], [4]] => [[2, 3], [4]]', () => {
                expect(isSameObject(gmp._mapArray([[0]], [[2, 3], [4]]), [[2, 3], [4]])).toBeTruthy();
            });
        });
    });
});
