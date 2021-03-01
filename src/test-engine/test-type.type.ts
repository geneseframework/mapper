import { TestIt } from './test-it.model';
import { TestMapper } from './test-mapper.model';

export type TestType = TestIt | TestMapper;


export function isTestIt(testType: TestType): testType is TestIt {
    return testType.hasOwnProperty('expected');
}
