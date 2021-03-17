import { Config } from '../../shared/models/config.model';

export interface TestMapperOptions {
    createOptions?: Config;
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    shouldFail?: boolean;
}
