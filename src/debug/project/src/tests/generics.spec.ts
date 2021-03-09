import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];


// -------------------------------------------   Class with Generic   -----------------------------------------------------


export class TClass<T> {
    name: string;
}
testMappers.push(new TestMapper(`'blue' / 'blue'`,`'blue'`, 'blue', {isolate: true})); // TODO : remove

testMappers.push(new TestMapper(`{name: 'a'} / TClass<T>`, 'TClass<T>', {name: 'a'}, {isolate: true}));
testMappers.push(new TestMapper(`'a' / TClass<T> / undefined`, 'TClass<T>', 'a', {expectedValue: undefined, isolate: false}));


// -----------------------------------------   Interface with Generic   ---------------------------------------------------


export class TInterface<T> {
    name: string;
}

testMappers.push(new TestMapper(`{name: 'a'} / TInterface<T>`, 'TInterface<T>', {name: 'a'}, {isolate: false}));
testMappers.push(new TestMapper(`'a' / TInterface<T> / undefined`, 'TInterface<T>', 'a', {expectedValue: undefined, isolate: false}));



// ---------------------------------------   Type with Generic extends   --------------------------------------------------


export type TExtends<T extends string> = T extends string ? string : boolean;

testMappers.push(new TestMapper(`'a' / TExtends<string>`, 'TExtends<string>', 'a', {isolate: false}));
testMappers.push(new TestMapper(`2 / TExtends<string> / undefined`, 'TExtends<string>', 2, {expectedValue: undefined, isolate: false}));

