import { TestIt } from '../../../../test-engine/test-it.model';
import { getFlattenElements } from '../../../../utils/tuples.util';

export const its: TestIt[] = [];

its.push(new TestIt(`getBasicElements(['a'])`, getFlattenElements, [`'a'`], [`'a'`], {isolate: true}));
// its.push(new TestIt(`getBasicElements(['abc', 'def'])`, [`'abc'`, `'def'`], getFlattenElements(`['abc', 'def']`), {isolate: false}));
// its.push(new TestIt(`getBasicElements(['a', ['b', 'c'])`, [`'a'`, `'b'`, `'c'`], getFlattenElements(`['a', ['b', 'c']]`), {isolate: true}));
