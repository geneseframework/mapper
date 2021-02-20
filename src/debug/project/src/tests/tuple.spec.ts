import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];

testMappers.push(new TestMapper(`['blue'] / ['string']`, ['string'],['blue']));
testMappers.push(new TestMapper(`['blue', 'white'] / ['string', 'string']`, ['string', 'string'],['blue', 'white']));
testMappers.push(new TestMapper(`'blue' / ['string'] / undefined`, ['string'],'blue', { expectedValue: undefined }));
testMappers.push(new TestMapper(`['blue'] / ['string', 'string'] / undefined`, ['string', 'string'],['blue'], { expectedValue: undefined }));
testMappers.push(new TestMapper(`[2] / ['string']`, ['string'],[2], { expectedValue: undefined }));

export class TupleClassSpec {
    name: string;
}

testMappers.push(new TestMapper(`[{ name: 'Léa'}] / [TupleClassSpec]`, [TupleClassSpec],[{ name: 'Léa'}]));
testMappers.push(new TestMapper(`[{ name: 'Léa'}, { name: 'Léo'}] / [TupleClassSpec, TupleClassSpec]`, [TupleClassSpec, TupleClassSpec],[{ name: 'Léa'}, { name: 'Léo'}]));
testMappers.push(new TestMapper(`[{ name: 'Léa'}, 'Blue'] / [TupleClassSpec, 'string']`, [TupleClassSpec, 'string'],[{ name: 'Léa'}, 'Blue']));

// TODO : Tuple of Tuples
// testMappers.push(new TestMapper(`[{ name: 'Léa'}, 'Blue'] / [TupleClassSpec, ['string', 'number']]`, [TupleClassSpec, ['string', 'number']],[{ name: 'Léa'}, ['Blue', 0]]));

