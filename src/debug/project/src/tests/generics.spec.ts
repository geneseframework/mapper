import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];


// -------------------------------------------   Class with Generic   -----------------------------------------------------


export class TClass<T> {
    name: string;
}

testMappers.push(new TestMapper(`{name: 'a'} / TClass<T>`, 'TClass<T>', {name: 'a'}, {isolate: false}));
testMappers.push(new TestMapper(`'a' / TClass<T> / undefined`, 'TClass<T>', 'a', {expectedValue: undefined, isolate: false}));


// -----------------------------------------   Interface with Generic   ---------------------------------------------------


export class TInterface<T> {
    name: string;
}

testMappers.push(new TestMapper(`{name: 'a'} / TInterface<T>`, 'TInterface<T>', {name: 'a'}, {isolate: false}));
testMappers.push(new TestMapper(`'a' / TInterface<T> / undefined`, 'TInterface<T>', 'a', {expectedValue: undefined, isolate: false}));

