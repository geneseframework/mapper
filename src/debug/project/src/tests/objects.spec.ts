import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{color: 'blue'} / object`, 'object',{color: 'blue'}, { isolate: true}));
testMappers.push(new TestMapper(`{color: 'blue'} / object`, 'Object',{color: 'blue'}, { isolate: true}));
testMappers.push(new TestMapper(`{color: 'blue'} / object`, Object,{color: 'blue'}, { isolate: true}));


