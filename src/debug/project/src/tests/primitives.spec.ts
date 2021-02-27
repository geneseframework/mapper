import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];

// --------------------------------------------------   Strings   ---------------------------------------------------------

testMappers.push(new TestMapper(`'blue' / string`, 'string','blue'));
testMappers.push(new TestMapper(`undefined / string`, 'string',undefined));
testMappers.push(new TestMapper(`null / string`, 'string',null));
testMappers.push(new TestMapper(`2 / string / undefined`, 'string',2, {expectedValue: undefined}));
testMappers.push(new TestMapper(`2 / string & !differentiate / '2'`, 'string',2, {expectedValue: '2', createOptions: {differentiateStringsAndNumbers: false}}));

testMappers.push(new TestMapper(`'blue' / string`, String,'blue'));

// --------------------------------------------------   Numbers   ---------------------------------------------------------

testMappers.push(new TestMapper(`2 / number`, 'number',2));
testMappers.push(new TestMapper(`'2' / number / undefined`, 'number','2', {expectedValue: undefined}));
testMappers.push(new TestMapper(`'2' / number & !differentiate / 2`, 'number','2', {expectedValue: 2, createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`undefined / number`, 'number',undefined));
testMappers.push(new TestMapper(`2 / number / undefined`, 'number','blue', {expectedValue: undefined}));

testMappers.push(new TestMapper(`2 / Number`, Number,2));

// -------------------------------------------------   Booleans   ---------------------------------------------------------

testMappers.push(new TestMapper(`true / boolean`, 'boolean',true));
testMappers.push(new TestMapper(`undefined / boolean`, 'boolean',undefined));
testMappers.push(new TestMapper(`2 / boolean / undefined`, 'boolean','blue', {expectedValue: undefined}));

// ------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------   Arrays   ---------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------


// --------------------------------------------------   Strings   ---------------------------------------------------------


testMappers.push(new TestMapper(`['blue'] / string[]`, 'string[]',['blue']));
testMappers.push(new TestMapper(`['blue', 'white'] / string[]`, 'string[]',['blue', 'white']));
testMappers.push(new TestMapper(`['blue', 2] / string[] / ['blue']`, 'string[]',['blue', 2], {expectedValue: ['blue']}));
testMappers.push(new TestMapper(`undefined / string[]`, 'string[]',undefined));
testMappers.push(new TestMapper(`'blue' / string[] / undefined`, 'string[]','blue', {expectedValue: undefined}));
testMappers.push(new TestMapper(`[2] / string[] / []`, 'string[]',[2], {expectedValue: []}));
testMappers.push(new TestMapper(`[2] / string[] && !differentiate / ['2']`, 'string[]',[2], {expectedValue: ['2'], createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`[] / string[] / []`, 'string[]',[]));
testMappers.push(new TestMapper(`[{}] / string[] / [{}]`, 'string[]',[{}], {expectedValue: []}));
testMappers.push(new TestMapper(`[{}] / string[] / [['a']]`, 'string[]',[['a']], {expectedValue: []}));
testMappers.push(new TestMapper(`[undefined] / string[] / [undefined]`, 'string[]',[undefined], {expectedValue: [undefined]}));
testMappers.push(new TestMapper(`[null] / string[] / [null]`, 'string[]',[null], {expectedValue: [null]}));

testMappers.push(new TestMapper(`['blue'] / [String]`, [String],['blue']));
testMappers.push(new TestMapper(`['blue', 'white'] / [String]`, [String],['blue', 'white']));
testMappers.push(new TestMapper(`[] / [String]`, [String],[], {expectedValue: []}));

testMappers.push(new TestMapper(`['blue'] / ['string']`, ['string'],['blue']));
testMappers.push(new TestMapper(`[2] / ['string'] / []`, ['string'],[2], {expectedValue: []}));
testMappers.push(new TestMapper(`[2] / ['string'] && !differentiate / ['2']`, ['string'],[2], {expectedValue: ['2'], createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`'blue' / ['string'] / undefined`, ['string'],'blue', {expectedValue: undefined}));


// --------------------------------------------------   Numbers   ---------------------------------------------------------


testMappers.push(new TestMapper(`[2] / number[]`, 'number[]',[2]));
testMappers.push(new TestMapper(`['2'] / number[] && !differentiate / [2]`, 'number[]',['2'], {expectedValue: [2], createOptions: {differentiateStringsAndNumbers: false}}));
testMappers.push(new TestMapper(`['2'] / [Number] && !differentiate / [2]`, [Number],['2'], {expectedValue: [2], createOptions: {differentiateStringsAndNumbers: false}}));


// --------------------------------------------------   Booleans   ---------------------------------------------------------


testMappers.push(new TestMapper(`[true] / boolean[]`, 'boolean[]',[true]));
testMappers.push(new TestMapper(`['true'] / boolean[] / [true]`, 'boolean[]',['true'], {expectedValue: []}));
testMappers.push(new TestMapper(`['true'] / [Boolean] / [true]`, [Boolean],['true'], {expectedValue: []}));
