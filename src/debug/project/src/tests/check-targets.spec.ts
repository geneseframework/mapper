import { TestIt } from '../../../../test-engine/test-it.model';
import { getElements, getFlattenElements } from '../../../../utils/native/tuples.util';
import { InitCheckTargetsService } from '../../../../services/init/init-check-targets.service';
import { StringTargetService } from '../../../../services/targets/string-target.service';

export const its: TestIt[] = [];

export class CheckClassSpec {
    name: string;
}

class NotExportedCheckClassSpec {
    name: string;
}

export type CheckTypeSpec = string | number;

function notConstructor() {
    return;
}

// ---------------------------------   InitCheckTargetsService.hasCorrectFormat   -----------------------------------------

its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, 2, true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, false, true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, String, true, {isolate: false}));
// its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, notConstructor, false, {isolate: false})); // TODO : implement isFunctionWhichIsNotExportedClass()
its.push(new TestIt(`hasCorrectFormat([String])`, InitCheckTargetsService.hasCorrectFormat, [String], true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat([String])`, InitCheckTargetsService.hasCorrectFormat, [String, Number], true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat(ClassSpec)`, InitCheckTargetsService.hasCorrectFormat, CheckClassSpec, true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat([ClassSpec])`, InitCheckTargetsService.hasCorrectFormat, [CheckClassSpec], true, {isolate: false}));
its.push(new TestIt(`hasCorrectFormat([ClassSpec])`, InitCheckTargetsService.hasCorrectFormat, [CheckClassSpec, CheckClassSpec], true, {isolate: false}));


// ---------------------------------   StringTargetService.hasCorrectElements   -----------------------------------------


its.push(new TestIt(`isCorrectTarget(string)`, StringTargetService.isCorrectTarget, 'string', true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(String)`, StringTargetService.isCorrectTarget, 'String', true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget('string')`, StringTargetService.isCorrectTarget, `'string'`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget("a")`, StringTargetService.isCorrectTarget, `"a"`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(string[])`, StringTargetService.isCorrectTarget, `[string]`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(string[])`, StringTargetService.isCorrectTarget, `string[]`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(string | number)`, StringTargetService.isCorrectTarget, `string | number`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(string | number | boolean)`, StringTargetService.isCorrectTarget, `string | number | boolean`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(string || number)`, StringTargetService.isCorrectTarget, `string || number`, false, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(string | number)`, StringTargetService.isCorrectTarget, `string & number`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(CheckClassSpec)`, StringTargetService.isCorrectTarget, `CheckClassSpec`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(WrongCheckClassSpec)`, StringTargetService.isCorrectTarget, `WrongCheckClassSpec`, false, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(NotExportedCheckClassSpec)`, StringTargetService.isCorrectTarget, `NotExportedCheckClassSpec`, true, {isolate: false}));
its.push(new TestIt(`isCorrectTarget(CheckClassSpec | CheckTypeSpec)`, StringTargetService.isCorrectTarget, `CheckClassSpec | CheckTypeSpec`, true, {isolate: true}));


// ---------------------------------   getElements   -----------------------------------------


its.push(new TestIt(`getElements(['a'])`, getElements, `['a']`, [`'a'`], {isolate: false}));
// its.push(new TestIt(`getElements(['a', ['b', 'c']])`, getElements, [`'a', ['b', 'c']`], [`'a'`, `['b', 'c']`], {isolate: true, log: true}));


its.push(new TestIt(`getFlattenElements(['a'])`, getFlattenElements, [`'a'`], [`'a'`], {isolate: false}));
its.push(new TestIt(`getFlattenElements(['abc', 'def'])`, getFlattenElements, [`'abc'`, `'def'`], [`'abc'`, `'def'`], {isolate: false}));
its.push(new TestIt(`getFlattenElements(['a', ['b', 'c']])`, getFlattenElements, ['a', ['b', 'c']], [`'a'`, `'b'`, `'c'`], {isolate: false}));
