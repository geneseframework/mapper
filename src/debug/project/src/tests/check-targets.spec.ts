import { TestIt } from '../../../../test-engine/test-it.model';
import { getContainerizedElements, getElements } from '../../../../utils/target.util';
import { CheckTargetsService } from '../../../../services/init/check-targets.service';

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

// ---------------------------------   CheckTargetsService.hasCorrectFormat   -----------------------------------------

its.push(new TestIt(`checkTargetFormat(2)`, CheckTargetsService.hasCorrectFormat, 2, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(false)`, CheckTargetsService.hasCorrectFormat, false, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(String)`, CheckTargetsService.hasCorrectFormat, String, true, {isolate: true}));
// its.push(new TestIt(`checkTargetFormat(String)`, CheckTargetsService.hasCorrectFormat, notConstructor, false)); // TODO : implement isFunctionWhichIsNotExportedClass()
its.push(new TestIt(`checkTargetFormat([String])`, CheckTargetsService.hasCorrectFormat, [String], true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat([String, Number])`, CheckTargetsService.hasCorrectFormat, [String, Number], true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(ClassSpec)`, CheckTargetsService.hasCorrectFormat, CheckClassSpec, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat([ClassSpec])`, CheckTargetsService.hasCorrectFormat, [CheckClassSpec], true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat([ClassSpec])`, CheckTargetsService.hasCorrectFormat, [CheckClassSpec, CheckClassSpec], true, {isolate: true}));


// ---------------------------------   StringTargetService.hasCorrectElements   -----------------------------------------


its.push(new TestIt(`checkTargetFormat(string)`, CheckTargetsService.hasCorrectFormat, 'string', true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(String)`, CheckTargetsService.hasCorrectFormat, 'String', true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat('string')`, CheckTargetsService.hasCorrectFormat, `'string'`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat("a")`, CheckTargetsService.hasCorrectFormat, `"a"`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(string[])`, CheckTargetsService.hasCorrectFormat, `[string]`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(string[])`, CheckTargetsService.hasCorrectFormat, `string[]`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(string | number)`, CheckTargetsService.hasCorrectFormat, `string | number`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(string | number | boolean)`, CheckTargetsService.hasCorrectFormat, `string | number | boolean`, true, {isolate: true}));
// TODO: fix
// its.push(new TestIt(`checkTargetFormat(string || number)`, CheckTargetsService.hasCorrectFormat, `string || number`, false, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(string | number)`, CheckTargetsService.hasCorrectFormat, `string & number`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(CheckClassSpec)`, CheckTargetsService.hasCorrectFormat, `CheckClassSpec`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(WrongCheckClassSpec)`, CheckTargetsService.hasCorrectFormat, `WrongCheckClassSpec`, false));
its.push(new TestIt(`checkTargetFormat(NotExportedCheckClassSpec)`, CheckTargetsService.hasCorrectFormat, `NotExportedCheckClassSpec`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(CheckClassSpec | CheckTypeSpec)`, CheckTargetsService.hasCorrectFormat, `CheckClassSpec | CheckTypeSpec`, true, {isolate: true}));
its.push(new TestIt(`checkTargetFormat(CheckClassSpec | CheckTypeSpec)`, CheckTargetsService.hasCorrectFormat, `['a']`, true, {isolate: true}));


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
