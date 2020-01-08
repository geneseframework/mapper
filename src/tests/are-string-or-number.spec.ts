import { GeneseMapper } from '..';

describe('GENESE MAPPER arrayMap', () => {
    const gmp = new GeneseMapper(Object);


    // **************************************************************************
    // _areStringOrNumber
    // **************************************************************************

    describe('_areStringOrNumber', () => {

        it('1, undefined => false', () => {
            expect(gmp._areStringOrNumber(1, undefined) === false).toBeTruthy();
        });

        it('undefined, 1 => false', () => {
            expect(gmp._areStringOrNumber(undefined, 1) === false).toBeTruthy();
        });

        it('2, 1 => true', () => {
            expect(gmp._areStringOrNumber(2, 1) === true).toBeTruthy();
        });

        it('2, "1" => true', () => {
            expect(gmp._areStringOrNumber(2, '1') === true).toBeTruthy();
        });

        it('"2", 1 => true', () => {
            expect(gmp._areStringOrNumber('2', 1) === true).toBeTruthy();
        });

        it('"2", "1" => true', () => {
            expect(gmp._areStringOrNumber('2', '1') === true).toBeTruthy();
        });
    });

});
