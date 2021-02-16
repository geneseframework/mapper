import { TestMapper } from '../../../../test-engine/test-mapper.model';

export enum ColorSpec {
    WHITE = 'White',
    BLACK = 'Black',
    RED = 'Red'
}

export class ColorClassSpec {
    color: ColorSpec;
}

export class ColorsClassSpec {
    colors: ColorSpec[];
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{ color: 'White' } / ColorClassSpec`, ColorClassSpec, { color: 'White' }));

