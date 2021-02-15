import { MapParameter } from '../types/map-parameter.type';
import { TestMapperOptions } from './test-mapper-options.interface';

export class TestMapper {

    title: string;
    mapParameter: MapParameter<any>;
    data: any;
    options?: TestMapperOptions;

    constructor(title: string, mapParameter: MapParameter<any>, data: any, options?: TestMapperOptions) {
        this.title= title;
        this.mapParameter = mapParameter;
        this.data = data;
        this.options = options;
    }

}

