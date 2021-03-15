import { TestMapperOptions } from './test-mapper-options.interface';

export class TestIt {

    data: any;
    expected: any;
    title: string;
    method: Function;
    options?: TestMapperOptions;

    constructor(title: string, method: Function, data: any, expected: any, options?: TestMapperOptions) {
        this.data = data;
        this.expected = expected;
        this.title= title;
        this.method = method;
        this.options = options;
    }

}

