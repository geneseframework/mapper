import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { ThrowOption } from '../../../../enums/throw-option.enum';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   Warnings   ----------------------------------------------------


testMappers.push(new TestMapper(`'blue' / 'ThrowWarning'`,`throw warning`, 'blue', {isolate: true}));
// testMappers.push(new TestMapper(`'blue' / 'ThrowWarning`,`throw warning`, 'blue', {expectedValue: undefined, createOptions: {throwTarget: {error: true}}, isolate: true}));
