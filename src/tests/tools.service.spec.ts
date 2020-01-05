import { isPrimitive, isSameObject } from '../services/tools.service';

describe('TOOLS', () => {

    describe('isPrimitive', () => {

        it('true => true', () => {
            expect(isPrimitive(true) === true).toBeTruthy();
        });

        it('false => true', () => {
            expect(isPrimitive(false) === true).toBeTruthy();
        });

        it('string => true', () => {
            expect(isPrimitive('string') === true).toBeTruthy();
        });

        it('number => true', () => {
            expect(isPrimitive(3) === true).toBeTruthy();
        });

        it('object => false', () => {
            expect(isPrimitive({}) === false).toBeTruthy();
        });

        it('null => false', () => {
            expect(isPrimitive(null) === false).toBeTruthy();
        });
    });

    describe('isSameObject', () => {

        it('{a: "z"}, {a: "z"} => true', () => {
            expect(isSameObject({a: 'z'}, {a: 'z'}) === true).toBeTruthy();
        });
        it('{a: ""}, {a: "z"} => true', () => {
            expect(isSameObject({a: ''}, {a: 'z'}) === false).toBeTruthy();
        });
        it('{a: {}}, {a: {}} => true', () => {
            expect(isSameObject({a: {}}, {a: {}}) === true).toBeTruthy();
        });
    });
});
