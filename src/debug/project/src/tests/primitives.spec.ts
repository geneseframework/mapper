import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`'blue' / string`, 'string','blue'));
testMappers.push(new TestMapper(`'blue' / string`, String,'blue'));
testMappers.push(new TestMapper(`undefined / string`, 'string',undefined));
testMappers.push(new TestMapper(`null / string`, 'string',null, { isolate: false }));
testMappers.push(new TestMapper(`'blue' / string / undefined`, 'string',2, { expectedValue: undefined }));



testMappers.push(new TestMapper(`2 / number`, 'number',2));
testMappers.push(new TestMapper(`2 / number`, Number,2));
testMappers.push(new TestMapper(`undefined / number`, 'number',undefined));
testMappers.push(new TestMapper(`2 / number / undefined`, 'number','blue', { expectedValue: undefined }));
testMappers.push(new TestMapper(`true / boolean`, 'boolean',true));
testMappers.push(new TestMapper(`undefined / boolean`, 'boolean',undefined));
testMappers.push(new TestMapper(`2 / boolean / undefined`, 'boolean','blue', { expectedValue: undefined }));



testMappers.push(new TestMapper(`['blue'] / string[]`, 'string[]',['blue']));
testMappers.push(new TestMapper(`['blue', 'white'] / string[]`, 'string[]',['blue', 'white']));
testMappers.push(new TestMapper(`['blue', 2] / string[] / ['blue']`, 'string[]',['blue', 2], { expectedValue: ['blue'] }));
testMappers.push(new TestMapper(`undefined / string[]`, 'string[]',undefined));
testMappers.push(new TestMapper(`'blue' / string[] / undefined`, 'string[]','blue', { expectedValue: undefined }));
testMappers.push(new TestMapper(`[2] / string[] / undefined`, 'string[]',[2], { expectedValue: undefined }));
testMappers.push(new TestMapper(`[undefined] / string[] / [undefined]`, 'string[]',[undefined], { expectedValue: [undefined] }));
testMappers.push(new TestMapper(`[null] / string[] / [null]`, 'string[]',[null], { expectedValue: [null] }));

