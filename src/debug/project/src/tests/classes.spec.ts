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
testMappers.push(new TestMapper(` / ClassWithAnySpec`, ClassWithAnySpec, { a: undefined, b: 'b'}, { expectedValue: { a: undefined } }));
testMappers.push(new TestMapper(` / ClassWithAnySpec`, ClassWithAnySpec, { a: [2], b: [null]}));


// -------------------------------------------------------------------------------------------------


export class OutOfProjectSpec {
    color: Chalk;
}

testMappers.push(new TestMapper(`{ color: 'White' } / Chalk / undefined`, 'Chalk', { color: 'White' }, { expectedValue: undefined }));
