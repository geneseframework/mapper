import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`['blue'] / ['string']`, ['string'],['blue'], { isolate: false }));
testMappers.push(new TestMapper(`['blue', 'white'] / ['string', 'string']`, ['string', 'string'],['blue', 'white']));
testMappers.push(new TestMapper(`'blue' / ['string'] / undefined`, ['string'],'blue', { expectedValue: undefined }));
testMappers.push(new TestMapper(`['blue'] / ['string', 'string'] / undefined`, ['string', 'string'],['blue'], { expectedValue: undefined }));
