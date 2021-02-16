import { MapperOptions } from '../interfaces/mapper-options.interface';

export interface TestMapperOptions {
    isolate?: boolean;
    log?: boolean;
    mapperOptions?: MapperOptions;
    shouldFail?: boolean;
}
