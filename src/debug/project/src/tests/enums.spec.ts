import { TestMapper } from '../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];

export enum ColorSpec {
    WHITE = 'White',
    BLACK = 'Black',
    RED = 'Red',
}

testMappers.push(new TestMapper(`'White' / ColorSpec`, 'ColorSpec', 'White', {isolate: false}));
testMappers.push(new TestMapper(`'Blue' / ColorSpec`, 'ColorSpec', 'Blue', {expectedValue: undefined, isolate: false}));


export class ColorClassSpec {
    color: ColorSpec;
}

export class ColorsClassSpec {
    colors: ColorSpec[];
}

testMappers.push(new TestMapper(`{color: 'White'} / ColorClassSpec`, ColorClassSpec, {color: 'White'}, {isolate: false}));
testMappers.push(new TestMapper(`{color: ColorSpec.WHITE} / ColorClassSpec`, ColorClassSpec, {color: ColorSpec.WHITE}));
testMappers.push(new TestMapper(`{color: 'Blue'} / ColorClassSpec / {}`, ColorClassSpec, {color: 'Blue'}, {expectedValue: {color: undefined}}));


testMappers.push(new TestMapper(`{colors: ['White']} / ColorClassSpec`, ColorsClassSpec, {colors: ['White']}));
testMappers.push(new TestMapper(`{colors: []} / ColorClassSpec / { colors: []}`, ColorsClassSpec, {colors: []}));
testMappers.push(new TestMapper(`{colors: ['Blue']} / ColorClassSpec / {colors: [undefined]}`, ColorsClassSpec, {colors: ['Blue']}, {expectedValue: {colors: [undefined]}}));
testMappers.push(new TestMapper(`{colors: [ColorSpec.WHITE]} / ColorClassSpec`, ColorsClassSpec, {colors: [ColorSpec.WHITE]}, {isolate: false}));
testMappers.push(new TestMapper(`{colors: [ColorSpec.WHITE, ColorSpec.BLACK]} / ColorClassSpec`, ColorsClassSpec, {colors: [ColorSpec.WHITE, ColorSpec.BLACK]}, {isolate: false}));


testMappers.push(new TestMapper(`'White' / ColorSpec`, 'ColorSpec', 'White'));
testMappers.push(new TestMapper(`'Blue' / ColorSpec / undefined`, 'ColorSpec', 'Blue', {expectedValue: undefined}));
testMappers.push(new TestMapper(`['White'] / ColorSpec[]`, 'ColorSpec[]', ['White']));
testMappers.push(new TestMapper(`[] / ColorSpec[]`, 'ColorSpec[]', []));
testMappers.push(new TestMapper(`['Blue'] / ColorSpec / undefined`, 'ColorSpec', ['Blue'], {expectedValue: undefined}));
testMappers.push(new TestMapper(`[ColorSpec.WHITE, ColorSpec.BLACK] / ColorSpec`, 'ColorSpec[]', [ColorSpec.WHITE, ColorSpec.BLACK]));
