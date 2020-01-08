import { GeneseMapper, isSameObject } from '..';

describe('GENESE MAPPER _arrayMap', () => {


    // **************************************************************************
    // Array of objects
    // **************************************************************************

    class TestClass {
        a ?= 0;
    }
    const geneseMapper = new GeneseMapper(TestClass);

    describe('objects', () => {

        it('[{a: 1}, {a: 2}] => [{a: 1}, {a: 2}]', () => {
            expect(isSameObject(geneseMapper.arrayMap([{a: 1}, {a: 2}]), [{a: 1}, {a: 2}])).toBeTruthy();
        });

        it('[] => []', () => {
            expect(isSameObject(geneseMapper.arrayMap([]), [])).toBeTruthy();
        });

        it('null => null', () => {
            expect(isSameObject(geneseMapper.arrayMap(null), null)).toBeTruthy();
        });

        it('undefined => []', () => {
            expect(isSameObject(geneseMapper.arrayMap(undefined), [])).toBeTruthy();
        });

        it('[{a: 1}, {b: 2}] => [{a: 1}, {a: 0}]', () => {
            expect(isSameObject(geneseMapper.arrayMap([{a: 1}, {b: 2}]), [{a: 1}, {a: 0}])).toBeTruthy();
        });
    });

});
