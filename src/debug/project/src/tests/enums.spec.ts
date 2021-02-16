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
testMappers.push(new TestMapper(`{ color: ColorSpec.WHITE } / ColorClassSpec`, ColorClassSpec, { color: ColorSpec.WHITE }));
testMappers.push(new TestMapper(`{ color: 'Blue' } / ColorClassSpec`, ColorClassSpec, { color: 'Blue' }, { shouldFail: true }));


testMappers.push(new TestMapper(`{ colors: ['White'] } / ColorClassSpec`, ColorsClassSpec, { colors: ['White'] }));
testMappers.push(new TestMapper(`{ colors: ['Blue'] } / ColorClassSpec / ShouldFail`, ColorsClassSpec, { colors: ['Blue'] }, { shouldFail: true }));
testMappers.push(new TestMapper(`{ colors: ['White'] } / ColorClassSpec`, ColorsClassSpec, { colors: [ColorSpec.WHITE] }));
testMappers.push(new TestMapper(`{ colors: ['White'] } / ColorClassSpec`, ColorsClassSpec, { colors: [ColorSpec.WHITE, ColorSpec.BLACK] }, { isolate: true }));
