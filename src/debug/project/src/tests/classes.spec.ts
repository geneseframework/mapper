import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Chalk, ColorSupport } from 'chalk';

export const testMappers: TestMapper[] = [];

export class CatSpec {
    name: string;
}
export class PersonCatSpec {
    cat: CatSpec;
    firstName: string;
}

testMappers.push(new TestMapper(`{ cat: { name: 'Cibi' }, firstName: 'Léa' } / PersonCatSpec`, PersonCatSpec, { cat: { name: 'Cibi' }, firstName: 'Léa' }));
testMappers.push(new TestMapper(`{ cat: { name: 'Cibi' }, firstName: 'Léa' } / PersonCatSpec / { cat: { name: 'Cibi' }, firstName: 'Léa' }`, PersonCatSpec, { cat: { name: 'Cibi', otherProperty: 'a' }, firstName: 'Léa' }, { expectedValue: { cat: { name: 'Cibi' }, firstName: 'Léa' } }));
testMappers.push(new TestMapper(`{ cat: null, firstName: 'Léa' } / PersonCatSpec`, PersonCatSpec, { cat: null, firstName: 'Léa' }));
testMappers.push(new TestMapper(`{ cat: undefined, firstName: 'Léa' } / PersonCatSpec`, PersonCatSpec, { cat: undefined, firstName: 'Léa' }));


// -------------------------------------------------------------------------------------------------


export class ClassWithPrimitivesSpec {
    str: string;
    num: number;
    bool: boolean;
    strs: string[];
    nums: number[];
    bools: boolean[];
}

testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec`, ClassWithPrimitivesSpec, { str: 'str', num: 2, bool: true, strs: ['str1', 'str2'], nums: [1, 2], bools: [true, false] }));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec / { bool: null }`, ClassWithPrimitivesSpec, { str: 3, num: 'num', bool: null }, { expectedValue: { bool: null }}));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec / { strs:[null], nums: [undefined], bools: [undefined]}`, ClassWithPrimitivesSpec, { strs: [1, null], nums: ['2', undefined], bools: ['a', undefined] }, { expectedValue: { strs:[null], nums: [undefined], bools: [undefined]}}));


// -------------------------------------------------------------------------------------------------


export class ClassWithAnySpec {
    a: any;
    b: any[];
    c;
}

testMappers.push(new TestMapper(` { a: 2, b: ['b'], c: 'c'} / ClassWithAnySpec`, ClassWithAnySpec, { a: 2, b: ['b'], c: 'c'}));
testMappers.push(new TestMapper(` { a: undefined, b: 'b'} / ClassWithAnySpec / { a: undefined }`, ClassWithAnySpec, { a: undefined, b: 'b'}, { expectedValue: { a: undefined } }));
testMappers.push(new TestMapper(` { a: [2], b: [null]} / ClassWithAnySpec`, ClassWithAnySpec, { a: [2], b: [null]}));
testMappers.push(new TestMapper(` { d: 3 } / ClassWithAnySpec`, ClassWithAnySpec, { d: 3 }, { expectedValue: {}}));


// -------------------------------------------------------------------------------------------------


export class IndexableSpec {
    a: string;
    [key: string]: string;
}

testMappers.push(new TestMapper(` { a: 'a', b: 'b' } / IndexableSpec`, IndexableSpec, { a: 'a', b: 'b' }));
testMappers.push(new TestMapper(` { a: 'a', b: 3 } / IndexableSpec / {a: 'a'}`, IndexableSpec, { a: 'a', b: 3 }, { expectedValue: {a: 'a'}}));


// -------------------------------------------------------------------------------------------------


export class IndexableNumberSpec {
    a: string;
    [key: number]: string;
}

testMappers.push(new TestMapper(` { a: 'a', 2: 'b' } / IndexableNumberSpec / {a: 'a'}`, IndexableNumberSpec, { a: 'a', 2: 'b' }, {expectedValue: {a: 'a'}}));
testMappers.push(new TestMapper(` { a: 'a', b: 3 } / IndexableNumberSpec / {a: 'a'}`, IndexableNumberSpec, { a: 'a', b: 3 }, { expectedValue: {a: 'a'}}));


// -------------------------------------------------------------------------------------------------


export class ValuesByDefault {
    a = 'aaa';
    b = 2;
    c = false;
    d = true;
}

testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'aaa', b: 2, c: false, d: true}`, ValuesByDefault, {}, {expectedValue: {a: 'aaa', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'z', b: 2, c: false, d: true}`, ValuesByDefault, {a: 'z'}, {expectedValue: {a: 'z', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'z', b: 2, c: false, d: true}`, ValuesByDefault, undefined));



// -------------------------------------------------------------------------------------------------


export class ValuesOnConstructor {
    a;
    b;
    c;
    d;

    constructor(a = 'aaa', b = 2, c = false, d = true) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
}

testMappers.push(new TestMapper(` {} / ValuesOnConstructor / {a: 'aaa', b: 2, c: false, d: true}`, ValuesOnConstructor, {}, {expectedValue: {a: 'aaa', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesOnConstructor / {a: 'z', b: 2, c: false, d: true}`, ValuesOnConstructor, {a: 'z'}, {expectedValue: {a: 'z', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesOnConstructor / {a: 'z', b: 2, c: false, d: true}`, ValuesOnConstructor, undefined));


// -------------------------------------------------------------------------------------------------


export class DateSpec {
    date: Date;
}

testMappers.push(new TestMapper(`{date: new Date()} / DateSpec / ~2021-02-19T18:07:29.446Z`, DateSpec, {date: new Date()}));
testMappers.push(new TestMapper(`{date: 'a'} / DateSpec / {date : 'Invalid Date'}`, DateSpec, {date: 'a'}, { expectedValue: {date : 'Invalid Date'}}));
testMappers.push(new TestMapper(`{date: null} / DateSpec`, DateSpec, {date: null}));
testMappers.push(new TestMapper(`{date: undefined} / DateSpec`, DateSpec, {date: undefined}));
testMappers.push(new TestMapper(`null / DateSpec / null`, DateSpec, null));
testMappers.push(new TestMapper(`{date: 1613756213999} / DateSpec / { date: 2021-02-19T17:36:53.999Z }`, DateSpec, {date: 1613756213999}));


// -------------------------------------------------------------------------------------------------


testMappers.push(new TestMapper(`2021-02-19T17:36:53.999Z / Date`, Date, '2021-02-19T17:36:53.999Z'));
testMappers.push(new TestMapper(`{} / Date / undefined`, Date, {}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`2021-02-19T17:36:53.999Z / 'Date'`, 'Date', '2021-02-19T17:36:53.999Z'));
testMappers.push(new TestMapper(`['2021-02-19T17:36:53.999Z', '2021-02-19T17:36:53.999Z'] / Date[]`, 'Date[]', ['2021-02-19T17:36:53.999Z', '2021-02-19T17:36:53.999Z']));


// -------------------------------------------------------------------------------------------------


export class OutOfProjectSpec {
    color: Chalk;
}

testMappers.push(new TestMapper(`{ color: 'White' } / Chalk / undefined`, 'Chalk', { color: 'White' }, { expectedValue: undefined }));


// -------------------------------------------------------------------------------------------------


export class ParentClassSpec {
    name: string;
    constructor(name: string) {
        this.name = name ?? 'unknown';
    }
}
export class ChildClassSpec extends ParentClassSpec {
    color: string;
    constructor(name: string, color: string) {
        super(name);
        this.color = color;
    }
}
testMappers.push(new TestMapper(`{ color: 'White' } / ChildClassSpec / { color: 'White', name: 'unknown' }`, ChildClassSpec, { color: 'White' }, {expectedValue:{ color: 'White', name: 'unknown' }}));
testMappers.push(new TestMapper(`{} / ChildClassSpec / { color: undefined, name: 'unknown' }`, ChildClassSpec, {}, {expectedValue:{color: undefined, name: 'unknown'}}));


// -------------------------------------------------------------------------------------------------


export abstract class AbstractParentClassSpec {
    name: string;
    protected constructor(name: string) {
        this.name = name ?? 'unknown';
    }
}
export class ChildAbstractClassSpec extends AbstractParentClassSpec {
    color: string;
    constructor(name: string, color: string) {
        super(name);
        this.color = color;
    }
}
testMappers.push(new TestMapper(`{ color: 'White' } / ChildAbstractClassSpec / { color: 'White', name: 'unknown' }`, ChildAbstractClassSpec, { color: 'White' }, {expectedValue:{ color: 'White', name: 'unknown' }}));
testMappers.push(new TestMapper(`{} / ChildAbstractClassSpec / { color: undefined, name: 'unknown' }`, ChildAbstractClassSpec, {}, {expectedValue:{color: undefined, name: 'unknown'}}));
testMappers.push(new TestMapper(`{} / AbstractParentClassSpec / undefined`, 'AbstractParentClassSpec', {}, {expectedValue: undefined}));
