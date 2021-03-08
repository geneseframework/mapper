import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { ColorSupport } from 'chalk';

export const testMappers: TestMapper[] = [];


// ---------------------------------------------   With optional property   -----------------------------------------------


export interface AnimalSpec {
    name: string;
    nickName?: string;
}

testMappers.push(new TestMapper(`{name: 'Biela'} / PreySpec`, 'AnimalSpec', {name: 'Biela'}, {isolate: false}));
testMappers.push(new TestMapper(`{name: 'Biela', nickName: 'Kitty'} / PreySpec`, 'AnimalSpec', {name: 'Biela', nickName: 'Kitty'}, {isolate: false}));
testMappers.push(new TestMapper(`{nickName: 'Kitty'} / PreySpec / undefined`, 'AnimalSpec', {nickName: 'Kitty' }, {expectedValue: undefined}));
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


testMappers.push(new TestMapper(`valid ColorSupport / ColorSupport `, 'ColorSupport', colorSupport, {isolate: true}));
testMappers.push(new TestMapper(`valid ColorSupport with nulls & undefined / ColorSupport `, 'ColorSupport', colorSupportWithNullAndUndefined, {isolate: false}));

