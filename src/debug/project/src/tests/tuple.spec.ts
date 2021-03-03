import { TestMapper} from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   Tuples of native   ------------------------------------------------


// testMappers.push(new TestMapper(`['blue'] / ['string']`, ['string'],['blue'], {isolate: true}));
testMappers.push(new TestMapper(`['blue', 'white'] / ['string', 'string']`, ['string', 'string'],['blue', 'white'], {isolate: true}));
testMappers.push(new TestMapper(`['blue', 3] / ['string', 'number']`, ['string', 'number'],['blue', 3], {isolate: true}));
testMappers.push(new TestMapper(`['blue', 3] / ['number', 'string'] / [undefined, undefined]`, ['number', 'string'],['blue', 3], {expectedValue: [undefined, undefined], isolate: true}));
testMappers.push(new TestMapper(`['2', 3] / ['number', 'string'] & !differentiate / ['2', '3']`, ['number', 'string'],['2', 3], {expectedValue: ['2', '3'], isolate: true, createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`['a', 3] / ['number', 'string'] & !differentiate / [NaN, '3']`, ['number', 'string'],['a', 3], {expectedValue: [NaN, '3'], isolate: true, createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`['blue'] / ['string', 'string'] / undefined`, ['string', 'string'],['blue'], {expectedValue: undefined, isolate: true}));
testMappers.push(new TestMapper(`'a' / ['string', 'string'] / undefined`, ['string', 'string'],'a', {expectedValue: undefined, isolate: true}));
testMappers.push(new TestMapper(`[true, false] / ['boolean', 'boolean']`, ['boolean', 'boolean'],[true, false], {isolate: true}));
testMappers.push(new TestMapper(`[true, 'false'] / ['boolean', 'boolean'] / [true, undefined]`, ['boolean', 'boolean'],[true, 'false'], {expectedValue: [true, undefined], isolate: true}));


testMappers.push(new TestMapper(`['blue'] / ['string']`, ['string'],['blue'], {isolate: true}));
testMappers.push(new TestMapper(`[2] / ['string'] / []`, ['string'],[2], {expectedValue: [undefined], isolate: true}));
testMappers.push(new TestMapper(`[2] / ['string'] && !differentiate / ['2']`, ['string'],[2], {expectedValue: ['2'], isolate: true, createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`'blue' / ['string'] / undefined`, ['string'],'blue', {expectedValue: undefined, isolate: true}));


testMappers.push(new TestMapper(`['blue'] / [String]`, [String],['blue'], {isolate: true}));
testMappers.push(new TestMapper(`['blue', 'white'] / [String]`, [String],['blue', 'white'], {expectedValue: undefined, isolate: true}));
testMappers.push(new TestMapper(`[] / [String]`, [String],[], {expectedValue: undefined, isolate: true}));


testMappers.push(new TestMapper(`[2] / ['number']`, ['number'],[2], {isolate: true}));
testMappers.push(new TestMapper(`['2'] / ['number'] / [undefined]`, ['number'],['2'], {expectedValue: [undefined], isolate: true}));
testMappers.push(new TestMapper(`['2'] / ['number'] / [2]`, ['number'],['2'], {expectedValue: [2], isolate: true, createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`['a'] / ['number'] / [NaN]`, ['number'],['a'], {expectedValue: [undefined], isolate: true}));

testMappers.push(new TestMapper(`['true'] / [Boolean] / [true]`, [Boolean],['true'], {expectedValue: [undefined], isolate: true}));
testMappers.push(new TestMapper(`['true'] / [Boolean] / [true]`, [Boolean],[true], {isolate: true}));
testMappers.push(new TestMapper(`['true'] / [Boolean] / [true]`, [Boolean],[false], {isolate: true}));
testMappers.push(new TestMapper(`['true'] / [Boolean] / [true]`, [Boolean],[null], {isolate: true}));
testMappers.push(new TestMapper(`['true'] / [Boolean] / [true]`, [Boolean],[undefined], {isolate: true}));

// ----------------------------------------------   Null or undefined   ------------------------------------------------


testMappers.push(new TestMapper(`['blue', 'white'] / ['string', 'string']`, ['string', 'string'],[null, undefined], {isolate: true}));


// ----------------------------------------------   Tuples of classes   ---------------------------------------------------


export class TupleClassSpec {
    name: string;
}

// TODO: fix with classes
testMappers.push(new TestMapper(`[{name: 'Léa'}, {name: 'Léo'}] / [TupleClassSpec, TupleClassSpec]`, [TupleClassSpec, TupleClassSpec],[{name: 'Léa'}, {name: 'Léo'}], {isolate: false}));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'Blue'] / [TupleClassSpec, 'string']`, [TupleClassSpec, 'string'],[{name: 'Léa'}, 'Blue'], {isolate: false}));
testMappers.push(new TestMapper(`['a', 'Blue'] / [TupleClassSpec, 'string'] / undefined`, [TupleClassSpec, 'string'],['a', 'Blue'], {expectedValue: [undefined], isolate: false}));


// --------------------------------------------   Tuples of interfaces   --------------------------------------------------


export interface TupleInterfaceSpec {
    name: string;
}

testMappers.push(new TestMapper(`[{name: 'Léa'}, {name: 'Léo'}] / [TupleInterfaceSpec, TupleInterfaceSpec]`, `['TupleInterfaceSpec', 'TupleInterfaceSpec']`,[{name: 'Léa'}, {name: 'Léo'}], {isolate: false}));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'Blue'] / [TupleInterfaceSpec, 'string']`, `['TupleInterfaceSpec', 'string']`,[{name: 'Léa'}, 'Blue'], {isolate: false}));


// --------------------------------------------   Tuples of types   --------------------------------------------------


export type TupleTypeSpec = TupleClassSpec | TupleInterfaceSpec;

testMappers.push(new TestMapper(`[{name: 'Léa'}, {name: 'Léo'}] / ['TupleTypeSpec', 'TupleTypeSpec']`, `['TupleTypeSpec', 'TupleTypeSpec']`,[{name: 'Léa'}, {name: 'Léo'}], {isolate: false}));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'a'] / ['TupleTypeSpec', 'TupleTypeSpec'] / undefined`, `['TupleTypeSpec', 'TupleTypeSpec']`,[{name: 'Léa'}, 'a'], {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'Blue'] / ['TupleTypeSpec', 'string']`, `['TupleTypeSpec', 'string']`,[{name: 'Léa'}, 'Blue'], {isolate: false}));


// ------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------   Tuples of tuples   ------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------


// ------------------------------------   Tuples [string, [string, string]]   ---------------------------------------------


export type TupleStringTupleStringStringSpec = ['string', ['string', 'string']];

testMappers.push(new TestMapper(`['a', ['b', 'c']] / ['string', ['string', 'string']]`, `['string', ['string', 'string']]`,['a', ['b', 'c']], {isolate: true}));
testMappers.push(new TestMapper(`['a', ['b', 'c']] / TupleStringTupleStringStringSpec`, 'TupleStringTupleStringStringSpec',['a', ['b', 'c']], {isolate: true}));
testMappers.push(new TestMapper(`['a', ['b', 2]] / TupleStringTupleStringStringSpec / ['a', ['b', undefined]`, 'TupleStringTupleStringStringSpec',['a', ['b', 2]], {expectedValue: ['a', ['b', undefined]], isolate: true}));
testMappers.push(new TestMapper(`['a', ['b', 2]] / TupleStringTupleStringStringSpec & !diff`, 'TupleStringTupleStringStringSpec',['a', ['b', 2]], {isolate: true, createOptions: {differentiateStringsAndNumbers: false}}));


// ------------------------------------   Tuples [string, [string, number]]   ---------------------------------------------


export type TupleStringTupleStringNumberSpec = ['string', ['string', 'number']];

testMappers.push(new TestMapper(`['a', ['b', 2]] / TupleStringTupleStringNumberSpec`, 'TupleStringTupleStringNumberSpec',['a', ['b', 2]], {isolate: true}));
testMappers.push(new TestMapper(`['a', ['b', 'c']] / TupleStringTupleStringNumberSpec`, 'TupleStringTupleStringNumberSpec',['a', ['b', 'c']], {expectedValue: ['a', ['b', undefined]], isolate: true}));
testMappers.push(new TestMapper(`['a', ['b', 'c']] / TupleStringTupleStringNumberSpec`, 'TupleStringTupleStringNumberSpec',['a', ['b', 'c']], {expectedValue: ['a', ['b', NaN]], isolate: true, createOptions: {differentiateStringsAndNumbers: false}}));
