import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`['blue'] / [string]`, ['string'],['blue'], { isolate: true }));
// testMappers.push(new TestMapper(`'blue' / [string] / undefined`, ['string'],'blue', { expectedValue: undefined }));
