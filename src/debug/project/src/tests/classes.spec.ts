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
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec`, ClassWithPrimitivesSpec, { str: 3, num: 'num', bool: null }, { expectedValue: { bool: null }}));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec`, ClassWithPrimitivesSpec, { strs: [1, null], nums: ['2', undefined], bools: ['a', undefined] }, { expectedValue: { strs:[null], nums: [undefined], bools: [undefined]}}));


// -------------------------------------------------------------------------------------------------


export class OutOfProjectSpec {
    color: Chalk;
}

testMappers.push(new TestMapper(`{ color: 'White' } / Chalk / undefined`, 'Chalk', { color: 'White' }, { expectedValue: undefined }));
