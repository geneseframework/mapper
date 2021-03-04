import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { ThrowOption } from '../../../../enums/throw-option.enum';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   Warnings   ----------------------------------------------------


testMappers.push(new TestMapper(`'blue' / 'ThrowWarning`,`throw warning`, 'blue', {expectedValue: 'blue', isolate: false}));
// testMappers.push(new TestMapper(`'blue' / 'ThrowWarning`,`throw warning`, 'blue', {expectedValue: 'blue', createOptions: {throw: ThrowOption.ERROR}, isolate: true}));
