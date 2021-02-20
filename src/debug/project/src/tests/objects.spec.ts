import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];

testMappers.push(new TestMapper(`{color: 'blue'} / object`, 'object',{color: 'blue'}));
testMappers.push(new TestMapper(`{color: 'blue'} / 'Object'`, 'Object',{color: 'blue'}));
testMappers.push(new TestMapper(`{color: 'blue'} / 'Object'`, 'Object',{color: null}));
testMappers.push(new TestMapper(`{color: 'blue'} / 'Object'`, 'Object',{color: undefined}));
testMappers.push(new TestMapper(`{color: 'blue'} / Object`, Object,{color: 'blue'}));
testMappers.push(new TestMapper(`{color: 'blue'} / object / undefined`, 'object','blue', {expectedValue: undefined}));
testMappers.push(new TestMapper(`{color: 'blue'} / object / null`, 'object',null));
testMappers.push(new TestMapper(`{color: 'blue'} / object / undefined`, 'object',undefined, {expectedValue: undefined}));

