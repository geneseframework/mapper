import { TestIt } from '../../../../test-engine/test-it.model';
import { getContainerizedElements, getElements } from '../../../../utils/target.util';
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

its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, 2, true));
its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, false, true));
its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, String, true));
// its.push(new TestIt(`hasCorrectFormat(String)`, InitCheckTargetsService.hasCorrectFormat, notConstructor, false)); // TODO : implement isFunctionWhichIsNotExportedClass()
its.push(new TestIt(`hasCorrectFormat([String])`, InitCheckTargetsService.hasCorrectFormat, [String], true));
its.push(new TestIt(`hasCorrectFormat([String])`, InitCheckTargetsService.hasCorrectFormat, [String, Number], true));
its.push(new TestIt(`hasCorrectFormat(ClassSpec)`, InitCheckTargetsService.hasCorrectFormat, CheckClassSpec, true));
its.push(new TestIt(`hasCorrectFormat([ClassSpec])`, InitCheckTargetsService.hasCorrectFormat, [CheckClassSpec], true));
its.push(new TestIt(`hasCorrectFormat([ClassSpec])`, InitCheckTargetsService.hasCorrectFormat, [CheckClassSpec, CheckClassSpec], true));


// ---------------------------------   StringTargetService.hasCorrectElements   -----------------------------------------


its.push(new TestIt(`isCorrectStringTarget(string)`, StringTargetService.isCorrectStringTarget, 'string', true));
its.push(new TestIt(`isCorrectStringTarget(String)`, StringTargetService.isCorrectStringTarget, 'String', true));
its.push(new TestIt(`isCorrectStringTarget('string')`, StringTargetService.isCorrectStringTarget, `'string'`, true));
its.push(new TestIt(`isCorrectStringTarget("a")`, StringTargetService.isCorrectStringTarget, `"a"`, true));
its.push(new TestIt(`isCorrectStringTarget(string[])`, StringTargetService.isCorrectStringTarget, `[string]`, true));
its.push(new TestIt(`isCorrectStringTarget(string[])`, StringTargetService.isCorrectStringTarget, `string[]`, true));
its.push(new TestIt(`isCorrectStringTarget(string | number)`, StringTargetService.isCorrectStringTarget, `string | number`, true));
its.push(new TestIt(`isCorrectStringTarget(string | number | boolean)`, StringTargetService.isCorrectStringTarget, `string | number | boolean`, true));
// TODO: fix
// its.push(new TestIt(`isCorrectStringTarget(string || number)`, StringTargetService.isCorrectStringTarget, `string || number`, false, {isolate: true}));
its.push(new TestIt(`isCorrectStringTarget(string | number)`, StringTargetService.isCorrectStringTarget, `string & number`, true));
its.push(new TestIt(`isCorrectStringTarget(CheckClassSpec)`, StringTargetService.isCorrectStringTarget, `CheckClassSpec`, true));
its.push(new TestIt(`isCorrectStringTarget(WrongCheckClassSpec)`, StringTargetService.isCorrectStringTarget, `WrongCheckClassSpec`, false));
its.push(new TestIt(`isCorrectStringTarget(NotExportedCheckClassSpec)`, StringTargetService.isCorrectStringTarget, `NotExportedCheckClassSpec`, true));
its.push(new TestIt(`isCorrectStringTarget(CheckClassSpec | CheckTypeSpec)`, StringTargetService.isCorrectStringTarget, `CheckClassSpec | CheckTypeSpec`, true));
its.push(new TestIt(`isCorrectStringTarget(CheckClassSpec | CheckTypeSpec)`, StringTargetService.isCorrectStringTarget, `['a']`, true));


// ----------------------------------------------   getElements   ---------------------------------------------------------


its.push(new TestIt(`getElements(['a'])`, getElements, `['a']`, [`['a']`]));


// ---------------------------------------   getContainerizedElements   ---------------------------------------------------


its.push(new TestIt(`getContainerizedElements(['a'])`, getContainerizedElements, `['a']`, [`'a'`]));
its.push(new TestIt(`getContainerizedElements([string, string])`, getContainerizedElements, `[string, string]`, [`string`, `string`]));
its.push(new TestIt(`getContainerizedElements([string, [string, string]])`, getContainerizedElements, `[string, [string, string]]`, [`string`, `[string, string]`]));
its.push(new TestIt(`getContainerizedElements(['a', ['b', 'c']])`, getContainerizedElements, `['a', ['b', 'c']]`, [`'a'`, `['b', 'c']`]));


// its.push(new TestIt(`getFlattenElements(['a'])`, getFlattenElements, [`'a'`], [`'a'`]));
// its.push(new TestIt(`getFlattenElements(['abc', 'def'])`, getFlattenElements, [`'abc'`, `'def'`], [`'abc'`, `'def'`]));
// its.push(new TestIt(`getFlattenElements(['a', ['b', 'c']])`, getFlattenElements, ['a', ['b', 'c']], [`'a'`, `'b'`, `'c'`]));
