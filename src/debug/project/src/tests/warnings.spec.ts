import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   Warnings   ----------------------------------------------------


testMappers.push(new TestMapper(`'blue' / ThrowWarning`,`throw warning`, 'blue', {isolate: false}));
testMappers.push(new TestMapper(`'blue' / ThrowWarning`,`throw warning`, 'blue', {expectedValue: undefined, createOptions: {throwTarget: {setToUndefined: true}}, isolate: false}));

export type NonReadableType<T> = T extends string ? number : boolean;

export class WarningSpec {
    name: NonReadableType<any>;
}

// testMappers.push(new TestMapper(`'blue' / WarningSpec`, WarningSpec, {name: 'a'}, {expectedValue: undefined, createOptions: {throwTarget: {setToUndefined: true}}, isolate: true}));

