import { TestMapperOptions } from './test-mapper-options.interface';
import { Target } from '../create/types/target/target.type';

export class TestMapper {

    title: string;
    mapParameter: Target<any>;
    data: any;
    options?: TestMapperOptions;

    constructor(title: string, mapParameter: Target<any>, data: any, options?: TestMapperOptions) {
        this.title= title;
        this.mapParameter = mapParameter;
        this.data = data;
        this.options = options;
    }

}

