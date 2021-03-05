import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];

// --------------------------------------------   Objects (not arrays)   --------------------------------------------------

testMappers.push(new TestMapper(`{color: 'blue'} / object`, 'object',{color: 'blue'}, {isolate: true}));
testMappers.push(new TestMapper(`{color: 'blue'} / 'Object'`, 'Object',{color: 'blue'}, {isolate: true}));
testMappers.push(new TestMapper(`{color: null} / 'Object'`, 'Object',{color: null}, {isolate: true}));
testMappers.push(new TestMapper(`{color: undefined} / 'Object'`, 'Object',{color: undefined}, {isolate: true}));
testMappers.push(new TestMapper(`'blue' / object / undefined`, 'object','blue', {expectedValue: undefined, isolate: true}));
testMappers.push(new TestMapper(`[{color: 'blue'}] / object / undefined`, 'object',[{color: 'blue'}], {isolate: true}));
testMappers.push(new TestMapper(`null / object / null`, 'object',null, {isolate: true}));
testMappers.push(new TestMapper(`undefined / object / undefined`, 'object',undefined, {expectedValue: undefined, isolate: true}));


// --------------------------------------------   ObjectConstructor   --------------------------------------------------


testMappers.push(new TestMapper(`{color: 'blue'} / ObjectConstructor`, Object,{color: 'blue'}, {isolate: true}));

// ---------------------------------------------   Arrays of objects   ----------------------------------------------------

// testMappers.push(new TestMapper(`{color: 'blue'} / object[]`, 'object[]',[{color: 'blue'}]));
// testMappers.push(new TestMapper(`{color: 'blue'} / object[]`, 'object[]',[{}]));
// testMappers.push(new TestMapper(`{color: 'blue'} / object[]`, 'object[]',[[{}]], {expectedValue: [], isolate: false}));
//
// testMappers.push(new TestMapper(`[{color: 'blue'}] / [Object]`, [Object],[{color: 'blue'}]));
// testMappers.push(new TestMapper(`'a' / [Object]`, [Object],'a', {expectedValue: undefined, isolate: false}));
// testMappers.push(new TestMapper(`['a'] / [Object]`, [Object],['a'], {expectedValue: [], isolate: false}));
// testMappers.push(new TestMapper(`['a'] / [Object]`, [Object],{element: ['a']}, {expectedValue: undefined, isolate: false}));
