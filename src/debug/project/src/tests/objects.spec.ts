import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{color: 'blue'} / object`, 'object',{color: 'blue'}, { isolate: true}));


