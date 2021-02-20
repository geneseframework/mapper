import { TestMapperOptions } from './test-mapper-options.interface';
import { MapTarget } from '../types/map-target.type';

export class TestMapper {

    title: string;
    mapParameter: MapTarget<any>;
    data: any;
    options?: TestMapperOptions;

    constructor(title: string, mapParameter: MapTarget<any>, data: any, options?: TestMapperOptions) {
        this.title= title;
        this.mapParameter = mapParameter;
        this.data = data;
        this.options = options;
    }

}

