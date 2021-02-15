import { MapperOptions } from '../interfaces/mapper-options.interface';

export interface TestMapperOptions {
    i?: boolean;
    log?: boolean;
    mapperOptions?: MapperOptions;
    shouldFail?: boolean;
}
