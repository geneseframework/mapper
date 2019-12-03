import { GeneseMapper } from '..';
import { isSameObject } from '../services/tools.service';

describe('GENESE MAPPER _mapNotPrimitive', () => {
    const gmp = new GeneseMapper(Object);


    // **************************************************************************
    // _mapNotPrimitive
    // **************************************************************************


    it('{a: 1}, undefined => undefined', () => {
        expect(isSameObject(gmp._mapNotPrimitive({a: 1}, undefined), {a: 1})).toBeTruthy();
    });

    it('{a: 1}, null => null', () => {
        expect(gmp._mapNotPrimitive({a: 1}, null) === null).toBeTruthy();
    });

    it('{a: 1}, {a: null} => {a: null}', () => {
        expect(isSameObject(gmp._mapNotPrimitive({a: 1}, {a: null}), {a: null})).toBeTruthy();
    });

    it('{a: 1}, {a: 1} => {a: 1}', () => {
        expect(isSameObject(gmp._mapNotPrimitive({a: 1}, {a: 1}), {a: 1})).toBeTruthy();
    });

    it('{a: 1}, {} => {a: 1}', () => {
        expect(isSameObject(gmp._mapNotPrimitive({a: 1}, {}), {a: 1})).toBeTruthy();
    });

    it('{a: 1}, {a: 2} => {a: 2}', () => {
        expect(isSameObject(gmp._mapNotPrimitive({a: 1}, {a: 2}), {a: 2})).toBeTruthy();
    });

    it('{a: {b: 1}}, {a: {b: 2}} => {a: {b: 2}}', () => {
        expect(isSameObject(gmp._mapNotPrimitive({a: {b: 1}}, {a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
    });

    it('{a: [1]}, {a: {b: 2}} => {a: [1]}', () => {
        expect(isSameObject(gmp._mapNotPrimitive({a: [1]}, {a: {b: 2}}), {a: [1]})).toBeTruthy();
    });

});
