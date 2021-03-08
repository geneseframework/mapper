import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   string   --------------------------------------------------------------


export class TClass<T> {
    name: string;
}

testMappers.push(new TestMapper(`{name: 'a'} / TClass<T>`, 'TClass<T>', {name: 'a'}, {isolate: true}));

