import { TestIt } from '../../../../test-engine/test-it.model';
import { getElements, getFlattenElements } from '../../../../utils/tuples.util';

export const its: TestIt[] = [];

its.push(new TestIt(`getElements(['a'])`, getElements, `['a']`, [`'a'`], {isolate: true}));
// its.push(new TestIt(`getElements(['a', ['b', 'c']])`, getElements, [`'a', ['b', 'c']`], [`'a'`, `['b', 'c']`], {isolate: true, log: true}));


its.push(new TestIt(`getFlattenElements(['a'])`, getFlattenElements, [`'a'`], [`'a'`], {isolate: false}));
its.push(new TestIt(`getFlattenElements(['abc', 'def'])`, getFlattenElements, [`'abc'`, `'def'`], [`'abc'`, `'def'`], {isolate: false}));
its.push(new TestIt(`getFlattenElements(['a', ['b', 'c']])`, getFlattenElements, ['a', ['b', 'c']], [`'a'`, `'b'`, `'c'`], {isolate: false}));
