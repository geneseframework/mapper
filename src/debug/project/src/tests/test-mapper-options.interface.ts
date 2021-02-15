import { MapperOptions } from '../../../../interfaces/mapper-options.interface';

export interface TestMapperOptions {
    log?: boolean;
    mapperOptions?: MapperOptions;
    shouldFail?: boolean;
}
