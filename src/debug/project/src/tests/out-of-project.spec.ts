import { TestMapper } from '../../../test-engine/test-mapper.model';
import { Oop } from '../../../out-of-project/files/out-of-project.model';
import { DirOop } from '../../../out-of-project/dir/dir-oop.model';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   Strings Literals   ----------------------------------------------------


testMappers.push(new TestMapper(`{name: 'a'} / Oop`,Oop, {name: 'a'}, {isolate: true}));
testMappers.push(new TestMapper(`{prop: 2} / DirOop`,DirOop, {prop: 2}, {isolate: true}));
