import { TestMapper } from '../../../test-engine/test-mapper.model';
import { OutOfProject } from '../../../out-of-project/files/out-of-project.model';
import { DirOop } from '../../../out-of-project/dir/dir-oop.model';
import { Oop } from '../../../out-of-project/files/oop.model';
import { OopInLocalTsconfig } from '../../../out-of-project/files/oop-in-local-tsconfig.model';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   Strings Literals   ----------------------------------------------------


testMappers.push(new TestMapper(`{name: 'a'} / OutOfProject`, OutOfProject, {name: 'a'}, {isolate: true}));
testMappers.push(new TestMapper(`{prop: 2} / DirOop`, DirOop, {prop: 2}, {isolate: true}));
testMappers.push(new TestMapper(`{prop: 'b'} / Oop`, Oop, {prop: 'b'}, {isolate: true}));
testMappers.push(new TestMapper(`{prop: 'b'} / OopInLocalTsconfig`, OopInLocalTsconfig, {prop: 'b'}, {isolate: true}));
