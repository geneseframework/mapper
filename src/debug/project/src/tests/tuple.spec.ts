import { TestMapper} from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];

// ----------------------------------------------   Tuples of primitives   ------------------------------------------------



testMappers.push(new TestMapper(`['blue', 'white'] / ['string', 'string']`, ['string', 'string'],['blue', 'white'], {isolate: false}));
testMappers.push(new TestMapper(`['blue', 3] / ['string', 'number']`, ['string', 'number'],['blue', 3]));
testMappers.push(new TestMapper(`['blue', 3] / ['number', 'string']`, ['number', 'string'],['blue', 3], {expectedValue: undefined}));
testMappers.push(new TestMapper(`['2', 3] / ['number', 'string'] & !differentiate / ['2', '3']`, ['number', 'string'],['2', 3], {expectedValue: ['2', '3'], createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`['a', 3] / ['number', 'string'] & !differentiate / [NaN, '3']`, ['number', 'string'],['a', 3], {expectedValue: [NaN, '3'], createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`['blue'] / ['string', 'string'] / undefined`, ['string', 'string'],['blue'], {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`'a' / ['string', 'string'] / undefined`, ['string', 'string'],'a', {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`[true, false] / ['boolean', 'boolean']`, ['boolean', 'boolean'],[true, false]));
testMappers.push(new TestMapper(`[true, 'false'] / ['boolean', 'boolean']`, ['boolean', 'boolean'],[true, 'false'], {expectedValue: undefined}));


// ----------------------------------------------   Null or undefined   ------------------------------------------------


testMappers.push(new TestMapper(`['blue', 'white'] / ['string', 'string']`, ['string', 'string'],[null, undefined], {isolate: false}));


// ----------------------------------------------   Tuples of classes   ---------------------------------------------------


export class TupleClassSpec {
    name: string;
}

testMappers.push(new TestMapper(`[{name: 'Léa'}, {name: 'Léo'}] / [TupleClassSpec, TupleClassSpec]`, [TupleClassSpec, TupleClassSpec],[{name: 'Léa'}, {name: 'Léo'}]));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'Blue'] / [TupleClassSpec, 'string']`, [TupleClassSpec, 'string'],[{name: 'Léa'}, 'Blue']));
testMappers.push(new TestMapper(`['a', 'Blue'] / [TupleClassSpec, 'string'] / undefined`, [TupleClassSpec, 'string'],['a', 'Blue'], {expectedValue: undefined}));


// --------------------------------------------   Tuples of interfaces   --------------------------------------------------


export interface TupleInterfaceSpec {
    name: string;
}

testMappers.push(new TestMapper(`[{name: 'Léa'}, {name: 'Léo'}] / [TupleInterfaceSpec, TupleInterfaceSpec]`, ['TupleInterfaceSpec', 'TupleInterfaceSpec'],[{name: 'Léa'}, {name: 'Léo'}]));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'Blue'] / [TupleInterfaceSpec, 'string']`, ['TupleInterfaceSpec', 'string'],[{name: 'Léa'}, 'Blue']));


// --------------------------------------------   Tuples of types   --------------------------------------------------


export type TupleTypeSpec = TupleClassSpec | TupleInterfaceSpec;

testMappers.push(new TestMapper(`[{name: 'Léa'}, {name: 'Léo'}] / ['TupleTypeSpec', 'TupleTypeSpec']`, ['TupleTypeSpec', 'TupleTypeSpec'],[{name: 'Léa'}, {name: 'Léo'}]));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'a'] / ['TupleTypeSpec', 'TupleTypeSpec'] / undefined`, ['TupleTypeSpec', 'TupleTypeSpec'],[{name: 'Léa'}, 'a'], {expectedValue: undefined}));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'Blue'] / ['TupleTypeSpec', 'string']`, ['TupleTypeSpec', 'string'],[{name: 'Léa'}, 'Blue']));


// --------------------------------------------   Tuples of tuples   --------------------------------------------------

// TODO
export type TupleTuplesSpec = ['string', ['string', 'number']];

testMappers.push(new TestMapper(`['a', ['b', 2]] / TupleTuplesSpec`, 'TupleTuplesSpec',['a', ['b', 2]], {isolate: false}));
