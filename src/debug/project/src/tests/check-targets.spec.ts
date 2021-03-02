import { TestIt } from '../../../../test-engine/test-it.model';
import { getElements, getFlattenElements } from '../../../../utils/native/tuples.util';
import { InitCheckTargetsService } from '../../../../services/init/init-check-targets.service';

export const its: TestIt[] = [];

class ClassSpec {
    name: string;
}

function notConstructor() {
    return;
}
git add
// --------------------------------------------   Check target   ----------------------------------------------------------

its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, 2, true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, false, true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, String, true, {isolate: false}));
// its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, notConstructor, false, {isolate: true})); // TODO : implement isFunctionWhichIsNotExportedClass()
its.push(new TestIt(`hasCorrectFormat([String])`, InitCheckTargetsService.hasCorrectFormat, [String], true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat([String])`, InitCheckTargetsService.hasCorrectFormat, [String, Number], true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat(ClassSpec)`, InitCheckTargetsService.hasCorrectFormat, ClassSpec, true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat([ClassSpec])`, InitCheckTargetsService.hasCorrectFormat, [ClassSpec], true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat([ClassSpec])`, InitCheckTargetsService.hasCorrectFormat, [ClassSpec, ClassSpec], true, {isolate: false}));



its.push(new TestIt(`getElements(['a'])`, getElements, `['a']`, [`'a'`], {isolate: false}));
// its.push(new TestIt(`getElements(['a', ['b', 'c']])`, getElements, [`'a', ['b', 'c']`], [`'a'`, `['b', 'c']`], {isolate: true, log: true}));


its.push(new TestIt(`getFlattenElements(['a'])`, getFlattenElements, [`'a'`], [`'a'`], {isolate: false}));
its.push(new TestIt(`getFlattenElements(['abc', 'def'])`, getFlattenElements, [`'abc'`, `'def'`], [`'abc'`, `'def'`], {isolate: false}));
its.push(new TestIt(`getFlattenElements(['a', ['b', 'c']])`, getFlattenElements, ['a', ['b', 'c']], [`'a'`, `'b'`, `'c'`], {isolate: false}));
