import { TestMapper } from '../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];

// --------------------------------------------   Objects (not arrays)   --------------------------------------------------

testMappers.push(new TestMapper(`{color: 'blue'} / object`, 'object',{color: 'blue'}, {isolate: false}));
testMappers.push(new TestMapper(`{color: 'blue'} / 'Object'`, 'Object',{color: 'blue'}, {isolate: false}));
testMappers.push(new TestMapper(`{color: null} / 'Object'`, 'Object',{color: null}, {isolate: false}));
testMappers.push(new TestMapper(`{color: undefined} / 'Object'`, 'Object',{color: undefined}, {isolate: false}));
testMappers.push(new TestMapper(`'blue' / object / undefined`, 'object','blue', {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`[{color: 'blue'}] / object / undefined`, 'object',[{color: 'blue'}], {isolate: false}));
testMappers.push(new TestMapper(`null / object / null`, 'object',null, {isolate: false}));
testMappers.push(new TestMapper(`undefined / object / undefined`, 'object',undefined, {expectedValue: undefined, isolate: false}));


// --------------------------------------------   ObjectConstructor   --------------------------------------------------


testMappers.push(new TestMapper(`{color: 'blue'} / ObjectConstructor`, Object,{color: 'blue'}, {isolate: false}));


// ---------------------------------------------   Arrays of objects   ----------------------------------------------------


testMappers.push(new TestMapper(`{color: 'blue'} / object[]`, 'object[]',[{color: 'blue'}], {isolate: false}));
testMappers.push(new TestMapper(`[{}] / object[]`, 'object[]',[{}], {isolate: false}));
testMappers.push(new TestMapper(`[[{}]] / object[]`, 'object[]',[[{}]], {isolate: false}));

testMappers.push(new TestMapper(`[{color: 'blue'}] / [Object]`, [Object],[{color: 'blue'}], {isolate: false}));
testMappers.push(new TestMapper(`'a' / [Object]`, [Object],'a', {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`['a'] / [Object]`, [Object],['a'], {expectedValue: [undefined], isolate: false}));
testMappers.push(new TestMapper(`{element: ['a']} / [Object]`, [Object],{element: ['a']}, {expectedValue: undefined, isolate: false}));


// ---------------------------------------------   Literal objects   ----------------------------------------------------


testMappers.push(new TestMapper(`{prop: 'a'} / {prop: string}`, '{prop: string}', {prop: 'a'}, {isolate: false}));
testMappers.push(new TestMapper(`{prop: 'a', nb: 2} / {prop: string, nb: number}`, '{prop: string, nb: number}', {prop: 'a', nb: 2}, {isolate: true}));

