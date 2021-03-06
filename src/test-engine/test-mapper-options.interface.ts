import { CreateOptions } from '../models/create-options.model';

export interface TestMapperOptions {
    createOptions?: CreateOptions;
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    shouldFail?: boolean;
}
