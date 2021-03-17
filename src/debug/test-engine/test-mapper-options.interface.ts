import { Config } from '../../shared/models/config.model';

export interface TestMapperOptions {
    config?: Config;
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    shouldFail?: boolean;
}
