import { TestMapper } from '../../../test-engine/test-mapper.model';
import { Oop } from '../../../out-of-project/files/out-of-project.model';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   Strings Literals   ----------------------------------------------------


testMappers.push(new TestMapper(`{name: 'a'} / Oop`,Oop, {name: 'a'}, {isolate: true}));
