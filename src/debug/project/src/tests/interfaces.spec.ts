import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { ColorSupport } from 'chalk';

export const testMappers: TestMapper[] = [];


// ---------------------------------------------   With optional property   -----------------------------------------------


export interface AnimalSpec {
    name: string;
    otherName?: string;
}

testMappers.push(new TestMapper(`{name: 'Biela'} / PreySpec`, 'AnimalSpec', {name: 'Biela'}, {isolate: false}));
testMappers.push(new TestMapper(`{name: 'Biela', otherName: 'Kitty'} / PreySpec`, 'AnimalSpec', {name: 'Biela', otherName: 'Kitty'}, {isolate: false}));
testMappers.push(new TestMapper(`{otherName: 'Kitty'} / PreySpec / undefined`, 'AnimalSpec', {otherName: 'Kitty' }, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{unknownProperty: 'Biela'} / PreySpec / undefined`, 'AnimalSpec', {unknownProperty: 'Biela' }, {expectedValue: undefined, isolate: false}));


// ------------------------------------------   With property which has Type   --------------------------------------------


export class AnimalOwner {
    animal: AnimalSpec;
}

testMappers.push(new TestMapper(`{animal: { name: 'Biela' }} / AnimalOwner`, 'AnimalOwner', {animal: { name: 'Biela' }}));


// ----------------------------------------------   External interfaces   -------------------------------------------------


const colorSupport: ColorSupport = {
    level: 1,
    has16m: true,
    has256: true,
    hasBasic: false
}

const colorSupportWithNullAndUndefined: ColorSupport = {
    level: 2,
    has16m: null,
    has256: undefined,
    hasBasic: false
}

// TODO: Fix cases of node_modules and external imports
// testMappers.push(new TestMapper(`valid ColorSupport / ColorSupport `, 'ColorSupport', colorSupport, {isolate: false}));
// testMappers.push(new TestMapper(`valid ColorSupport with nulls & undefined / ColorSupport `, 'ColorSupport', colorSupportWithNullAndUndefined, {isolate: false}));

