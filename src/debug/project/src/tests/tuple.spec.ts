import { TestMapper} from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];

// ----------------------------------------------   Tuples of primitives   ---------------------------------------------------



testMappers.push(new TestMapper(`['blue', 'white'] / ['string', 'string']`, ['string', 'string'],['blue', 'white']));
testMappers.push(new TestMapper(`['blue', 3] / ['string', 'number']`, ['string', 'number'],['blue', 3]));
testMappers.push(new TestMapper(`['blue', 3] / ['number', 'string']`, ['number', 'string'],['blue', 3], {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`['blue'] / ['string', 'string'] / undefined`, ['string', 'string'],['blue'], {expectedValue: undefined}));
testMappers.push(new TestMapper(`'a' / ['string', 'string'] / undefined`, ['string', 'string'],'a', {expectedValue: undefined}));
testMappers.push(new TestMapper(`[true, false] / ['boolean', 'boolean']`, ['boolean', 'boolean'],[true, false], {isolate: false}));
testMappers.push(new TestMapper(`[true, false] / ['boolean', 'boolean']`, ['boolean', 'boolean'],[true, 'false'], {expectedValue: undefined}));


// ----------------------------------------------   Tuples of classes   ---------------------------------------------------


export class TupleClassSpec {
    name: string;
}

testMappers.push(new TestMapper(`[{name: 'Léa'}] / [TupleClassSpec]`, [TupleClassSpec],[{name: 'Léa'}]));
testMappers.push(new TestMapper(`[{name: 'Léa'}, {name: 'Léo'}] / [TupleClassSpec, TupleClassSpec]`, [TupleClassSpec, TupleClassSpec],[{name: 'Léa'}, {name: 'Léo'}]));
testMappers.push(new TestMapper(`[{name: 'Léa'}, 'Blue'] / [TupleClassSpec, 'string']`, [TupleClassSpec, 'string'],[{name: 'Léa'}, 'Blue']));
