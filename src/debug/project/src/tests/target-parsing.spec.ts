import { TestIt } from '../../../../test-engine/test-it.model';
import { getElements } from '../../../../utils/tuples.util';

export const its: TestIt[] = [];

its.push(new TestIt(`getElements(['a']) / 'a'`, getElements(`['a']`), [`'a'`], {isolate: true}));
