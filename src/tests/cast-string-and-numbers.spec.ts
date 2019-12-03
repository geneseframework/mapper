import { GeneseMapper } from '../mapper/genese.mapper';

describe('GENESE MAPPER FACTORY', () => {
    const gmp = new GeneseMapper(Object);

    // **************************************************************************
    // _castStringAndNumbers
    // **************************************************************************

    describe('_castStringAndNumbers', () => {

        it('undefined, {a: 1} => undefined', () => {
            expect(gmp._castStringAndNumbers(undefined, {a: 1}) === undefined).toBeTruthy();
        });

        it('{a: 1}, undefined => undefined', () => {
            expect(gmp._castStringAndNumbers({a: 1}, undefined) === undefined).toBeTruthy();
        });

        it('{a: 1}, null => undefined', () => {
            expect(gmp._castStringAndNumbers({a: 1}, null) === undefined).toBeTruthy();
        });

        it('string1, string1 => string1', () => {
            expect(gmp._castStringAndNumbers('string1', 'string1') === 'string1').toBeTruthy();
        });

        it('1, 1 => 1', () => {
            expect(gmp._castStringAndNumbers(1, 1) === 1).toBeTruthy();
        });

        it('string1, string2 => string2', () => {
            expect(gmp._castStringAndNumbers('string1', 'string2') === 'string2').toBeTruthy();
        });

        it('string1, 1 => "1"', () => {
            expect(gmp._castStringAndNumbers('string1', 1) === '1').toBeTruthy();
        });

        it('2, "1" => 1', () => {
            expect(gmp._castStringAndNumbers(2, '1') === 1).toBeTruthy();
        });

        it('{a: 1}, {a: 2} => undefined', () => {
            expect(gmp._castStringAndNumbers({a: 1}, {a: 2}) === undefined).toBeTruthy();
        });

        it('{a: 1}, {a: 1} => {a: 1}', () => {
            expect(gmp._castStringAndNumbers({a: 1}, {a: 1}) === undefined).toBeTruthy();
        });

        it('{a: 1}, {a: 2} => true', () => {
            expect(gmp._castStringAndNumbers({a: 1}, {a: 2}) === undefined).toBeTruthy();
        });
    });
});
