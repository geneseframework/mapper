import { MapperBehavior } from '../../shared/models/config-behavior.model';

export interface TestMapperOptions {
    behavior?: MapperBehavior;
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    shouldFail?: boolean;
}
