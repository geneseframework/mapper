import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Mapper } from '../../../../models/mapper';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   string   --------------------------------------------------------------


export type StringAloneSpec = string;
testMappers.push(new TestMapper(`'Blue' / StringAloneSpec`, 'StringAloneSpec', 'Blue'));
testMappers.push(new TestMapper(`3 / StringAloneSpec / undefined`, 'StringAloneSpec', 3, {expectedValue: undefined}));


// -------------------------------------------   string | number   --------------------------------------------------------


testMappers.push(new TestMapper(`'Blue' / string | number`, 'string | number', 'Blue', {isolate: true}));
// testMappers.push(new TestMapper(`3 / string | number`, 'string | number', 3, {isolate: true}));



// ------------------------------------------   'Blue' | 'White'   --------------------------------------------------------


testMappers.push(new TestMapper(`'Blue' / 'Blue' | 'White'`, `'Blue' | 'White'`, 'Blue', {isolate: false, log: true}));
testMappers.push(new TestMapper(`'Green' / 'Blue' | 'White'`, `'Blue' | 'White'`, 'Green', {expectedValue: undefined, isolate: false}));


// ----------------------------------   Type defined with Union'Blue' | 'White'   -----------------------------------------


export type ColorsTypeSpec = 'Blue' | 'White';
testMappers.push(new TestMapper(`'Blue' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Blue', {isolate: false, log: true}));
testMappers.push(new TestMapper(`'Green' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Green', {expectedValue: undefined}));


// ---------------------------------------   Type defined by a Class   ----------------------------------------------------


export type CompanyAloneSpec = CompanyClassSpec;

testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / CompanyAloneSpec`, 'CompanyAloneSpec', {name: 'Total', employees: 30000}));
testMappers.push(new TestMapper(`3 / CompanyAloneSpec / {}`, 'CompanyAloneSpec', 3, {expectedValue: undefined}));



// ---------------------------------------------   Union types   ----------------------------------------------------------

async function z() {
    const zzz: string = await Mapper.create('string | number', 'a');
}
// testMappers.push(new TestMapper(`'a' / string | number`, 'String | number', 'a', {isolate: true}));
// testMappers.push(new TestMapper(`'a' / string | number`, '[String, number]', 'a', {isolate: true}));


// -----------------------------------   Union of two Classes, and one Class[]   ------------------------------------------


export type EmployerTypeSpec = NgoClassSpec | NgoClassSpec[] | CompanyClassSpec;
export class NgoClassSpec {
    name: string;
    volunteers: number;
}
export class CompanyClassSpec {
    name: string;
    employees: number;
}
export class PersonSpec {
    employer: EmployerTypeSpec
}


testMappers.push(new TestMapper(`{name: 'Greenpeace', volunteers: 3000} / Employer`, 'EmployerSpec',{name: 'Greenpeace', volunteers: 3000}));
testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / Employer`, 'EmployerSpec',{name: 'Total', employees: 30000}));
testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / EmployerSpec`, 'EmployerSpec',[{ name: 'Total', employees: 30000 }], {expectedValue: undefined}));
testMappers.push(new TestMapper(`[{ name: 'Total', volunteers: 3000 }] / EmployerSpec[]`, 'EmployerSpec[]',[{ name: 'Total', volunteers: 3000 }]));
