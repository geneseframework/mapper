import { MapperConfigBehavior } from '@genese/core';

export interface TestMapperOptions {
    behavior?: MapperConfigBehavior;
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    shouldFail?: boolean;
}
