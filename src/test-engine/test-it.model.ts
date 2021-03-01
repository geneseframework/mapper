import { TestMapperOptions } from './test-mapper-options.interface';
import { Target } from '../types/target/target.type';
import { futimes } from 'fs';

export class TestIt {

    data: any;
    title: string;
    response: any;
    options?: TestMapperOptions;

    constructor(title: string, response: any, data: any, options?: TestMapperOptions) {
        this.data = data;
        this.title= title;
        this.response = response;
        this.options = options;
    }

}

