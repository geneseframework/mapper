import { MapperOptions } from '../interfaces/mapper-options.interface';

export interface TestMapperOptions {
    expectedValue?: any;
    isolate?: boolean;
    log?: boolean;
    mapperOptions?: MapperOptions;
    shouldFail?: boolean;
}
