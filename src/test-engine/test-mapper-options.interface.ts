import { CreateOptions } from '../interfaces/create-options.interface';

export interface TestMapperOptions {
    createOptions?: CreateOptions;
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    shouldFail?: boolean;
}
