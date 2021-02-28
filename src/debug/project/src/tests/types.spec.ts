import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { StringOrStrings } from '../types/string-or-strings.type';
import { Mapper } from '../../../../models/mapper';

export type EmployerSpec = NgoSpec | NgoSpec[] | CompanySpec;
export class NgoSpec {
    name: string;
    volunteers: number;
}
export class CompanySpec {
    name: string;
    employees: number;
}
export class PersonSpec {
    employer: EmployerSpec
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{name: 'Greenpeace', volunteers: 3000} / Employer`, 'EmployerSpec',{name: 'Greenpeace', volunteers: 3000}));
testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / Employer`, 'EmployerSpec',{name: 'Total', employees: 30000}));
testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / EmployerSpec`, 'EmployerSpec',[{ name: 'Total', employees: 30000 }], {expectedValue: undefined}));
testMappers.push(new TestMapper(`[{ name: 'Total', volunteers: 3000 }] / EmployerSpec[]`, 'EmployerSpec[]',[{ name: 'Total', volunteers: 3000 }]));
testMappers.push(new TestMapper(`{employer: { name: 'Total', employees: 30000 }} / PersonSpec`, PersonSpec,{employer: { name: 'Total', employees: 30000 }}));
testMappers.push(new TestMapper(`{employer: [{ name: 'Total', employees: 30000 }]} / PersonSpec`, PersonSpec,{employer: [{ name: 'Total', employees: 30000 }]}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{employer: { name: 'Greenpeace', volunteers: 3000 }} / PersonSpec`, PersonSpec,{employer: [{ name: 'Greenpeace', volunteers: 3000 }]}));


// -------------------------------------------------------------------------------------------------


export class PaintStringOrStringsSpec {
    colors: StringOrStrings;
}

testMappers.push(new TestMapper(`{colors: 'Blue'} / PaintStringOrStringsSpec`, PaintStringOrStringsSpec, {colors: 'Blue'}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / PaintStringOrStringsSpec / {}`, PaintStringOrStringsSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{colors: ['Blue', 'White']} / PaintStringOrStringsSpec`, PaintStringOrStringsSpec, {colors: ['Blue', 'White']}));


// -------------------------------------------------------------------------------------------------


export type StringsOrStringSpec = string[] | string;
export class PaintStringsOrStringSpec {
    colors: StringsOrStringSpec;
}

testMappers.push(new TestMapper(`{colors: 'Blue'} / PaintStringsOrStringSpec`, PaintStringsOrStringSpec, {colors: 'Blue'}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / PaintStringsOrStringSpec / {}`, PaintStringsOrStringSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{colors: ['Blue', 'White']} / PaintStringsOrStringSpec`, PaintStringsOrStringSpec, {colors: ['Blue', 'White']}));


// -------------------------------------------------------------------------------------------------


export type NumbersOrNumberSpec = number[] | number;
export class AgeNumbersOrNumberSpec {
    ages: NumbersOrNumberSpec;
}

testMappers.push(new TestMapper(`{ages: 2} / AgeNumbersOrNumberSpec`, AgeNumbersOrNumberSpec, {ages: 2}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / AgeNumbersOrNumberSpec / {}`, AgeNumbersOrNumberSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{ages: [4, 6]} / AgeNumbersOrNumberSpec`, AgeNumbersOrNumberSpec, {ages: [4, 6]}));


// -------------------------------------------------------------------------------------------------


export type NumberOrNumbersSpec = number | number[];
export class AgeNumberOrNumbersSpec {
    ages: NumberOrNumbersSpec;
}

testMappers.push(new TestMapper(`{ages: 2} / AgeNumberOrNumbersSpec`, AgeNumberOrNumbersSpec, {ages: 2}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / AgeNumberOrNumbersSpec / {}`, AgeNumberOrNumbersSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{ages: [4, 6]} / AgeNumberOrNumbersSpec`, AgeNumberOrNumbersSpec, {ages: [4, 6]}));
testMappers.push(new TestMapper(`{ages: [4, 6]} / AgeNumberOrNumbersSpec`, AgeNumberOrNumbersSpec, {ages: ['rtty', 6]}, {expectedValue: {ages: [6]}}));


// -------------------------------------------------------------------------------------------------


export type LevelSpec = 1 | 2 | 3;
export class LevelClassSpec {
    level: LevelSpec
}

testMappers.push(new TestMapper(`{level: 1} / LevelClassSpec`, LevelClassSpec, {level: 1}));


// -------------------------------------------------------------------------------------------------


export type ColorsTypeSpec = 'Blue' | 'White';
testMappers.push(new TestMapper(`'Blue' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Blue'));
testMappers.push(new TestMapper(`'Green' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Green', {expectedValue: undefined}));


// -------------------------------------------------------------------------------------------------


export type StringAloneSpec = string;
testMappers.push(new TestMapper(`'Blue' / StringAloneSpec`, 'StringAloneSpec', 'Blue'));
testMappers.push(new TestMapper(`3 / StringAloneSpec / undefined`, 'StringAloneSpec', 3, {expectedValue: undefined}));


// -------------------------------------------------------------------------------------------------


export type CompanyAloneSpec = CompanySpec;
testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / CompanyAloneSpec`, 'CompanyAloneSpec', {name: 'Total', employees: 30000}));
testMappers.push(new TestMapper(`3 / CompanyAloneSpec / {}`, 'CompanyAloneSpec', 3, {expectedValue: undefined}));


// ---------------------------------------------   Union types   ----------------------------------------------------------

async function z() {
    const zzz: string = await Mapper.create('string | number', 'a');
}
testMappers.push(new TestMapper(`'a' / string | number`, 'Stringgg | number', 'a', {isolate: true}));
