import { CreateOptions } from '../../create/models/create-options.model';

export interface TestMapperOptions {
    createOptions?: CreateOptions;
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    shouldFail?: boolean;
}
