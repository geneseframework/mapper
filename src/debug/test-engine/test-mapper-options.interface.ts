import { MapperConfig } from '../../shared/models/config.model';

export interface TestMapperOptions {
    config?: MapperConfig;
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    shouldFail?: boolean;
}
