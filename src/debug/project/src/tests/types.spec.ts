import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];


// ----------------------------------------------   string   --------------------------------------------------------------


export type StringAloneSpec = string;
testMappers.push(new TestMapper(`'Blue' / StringAloneSpec`, 'StringAloneSpec', 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`3 / StringAloneSpec / undefined`, 'StringAloneSpec', 3, {expectedValue: undefined, isolate: true}));


// -------------------------------------------   string | number   --------------------------------------------------------


testMappers.push(new TestMapper(`'Blue' / string | number`, 'string | number', 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`3 / string | number`, 'string | number', 3, {isolate: false}));



// ------------------------------------------   'Blue' | 'White'   --------------------------------------------------------


testMappers.push(new TestMapper(`'Blue' / 'Blue' | 'White'`, `'Blue' | 'White'`, 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`'Green' / 'Blue' | 'White'`, `'Blue' | 'White'`, 'Green', {expectedValue: undefined, isolate: false}));


// ----------------------------------   Type defined with Union'Blue' | 'White'   -----------------------------------------


export type ColorsTypeSpec = 'Blue' | 'White';
testMappers.push(new TestMapper(`'Blue' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`'Green' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Green', {expectedValue: undefined}));


// ---------------------------------------   Type defined by another type   -----------------------------------------------


export type ParentTypeSpec = string;
export type ChildTypeSpec = ParentTypeSpec;

testMappers.push(new TestMapper(`'a' / ChildTypeSpecSpec`, 'ChildTypeSpec', 'a', {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildTypeSpecSpec / undefined`, 'ChildTypeSpec', 3, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`3 / ChildTypeSpecSpec / '3'`, 'ChildTypeSpec', 3, {expectedValue: '3', createOptions: {differentiateStringsAndNumbers: false}, isolate: false}));


// ---------------------------------------   Type defined by other types   -----------------------------------------------


export type Parent1TypeSpec = string;
export type Parent2TypeSpec = number;
export type ChildParentsTypeSpec = Parent1TypeSpec | Parent2TypeSpec;

testMappers.push(new TestMapper(`'a' / ChildParentsTypeSpec`, 'ChildParentsTypeSpec', 'a', {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildParentsTypeSpec`, 'ChildParentsTypeSpec', 3, {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildParentsTypeSpec / '3'`, 'ChildParentsTypeSpec', 3, {expectedValue: '3', createOptions: {differentiateStringsAndNumbers: false}, isolate: false}));
testMappers.push(new TestMapper(`{} / ChildParentsTypeSpec / undefined`, 'ChildParentsTypeSpec', {}, {expectedValue: undefined, createOptions: {differentiateStringsAndNumbers: false}, isolate: false}));


// ---------------------------------------   Type defined by other types   -----------------------------------------------


export type ParentNumberOrBooleanSpec = number | boolean;
export type ChildParentNumberOrBooleanAndStringSpec = ParentNumberOrBooleanSpec | string;

testMappers.push(new TestMapper(`'a' / ChildParentNumberOrBooleanAndStringSpec`, 'ChildParentNumberOrBooleanAndStringSpec', 'a', {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildParentNumberOrBooleanAndStringSpec`, 'ChildParentNumberOrBooleanAndStringSpec', 3, {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildParentNumberOrBooleanAndStringSpec / '3'`, 'ChildParentNumberOrBooleanAndStringSpec', 3, {isolate: false}));
testMappers.push(new TestMapper(`{} / ChildParentNumberOrBooleanAndStringSpec / undefined`, 'ChildParentNumberOrBooleanAndStringSpec', {}, {expectedValue: undefined, createOptions: {differentiateStringsAndNumbers: false}, isolate: false}));


// -----------------------------------------   Type defined by a Class   --------------------------------------------------


export class CompanyAloneClassSpec {
    name: string;
    employees: number;
}
export type CompanyAloneSpec = CompanyAloneClassSpec;

testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / CompanyAloneSpec`, 'CompanyAloneSpec', {name: 'Total', employees: 30000}, {isolate: false}));
testMappers.push(new TestMapper(`3 / CompanyAloneSpec / {}`, 'CompanyAloneSpec', 3, {expectedValue: undefined}));


// ----------------------------------------   Union types 0 | 1 | 2   -----------------------------------------------------


export type UnionTypeNumberLiteralSpec = 0 | 1 | 2;

testMappers.push(new TestMapper(`0 / UnionTypeNumberLiteralSpec`, 'UnionTypeNumberLiteralSpec', 0, {isolate: false}));
testMappers.push(new TestMapper(`2 / UnionTypeNumberLiteralSpec`, 'UnionTypeNumberLiteralSpec', 2, {isolate: false}));
testMappers.push(new TestMapper(`'a' / UnionTypeNumberLiteralSpec / undefined`, 'UnionTypeNumberLiteralSpec', 'a', {expectedValue: undefined, isolate: false}));
// TODO: fix
testMappers.push(new TestMapper(`'2' / UnionTypeNumberLiteralSpec & !diff / 2`, 'UnionTypeNumberLiteralSpec', '2', {expectedValue: undefined, createOptions: {differentiateStringsAndNumbers: true}, isolate: false}));
testMappers.push(new TestMapper(`'2' / UnionTypeNumberLiteralSpec & !diff / 2`, 'UnionTypeNumberLiteralSpec', '2', {expectedValue: 2, createOptions: {differentiateStringsAndNumbers: false}, isolate: false}));


// -------------------------------------   Union types string | number   --------------------------------------------------


export type UnionTypeSpec = string | number;

testMappers.push(new TestMapper(`'a' / UnionTypeSpec`, 'UnionTypeSpec', 'a', {isolate: false}));
testMappers.push(new TestMapper(`2 / UnionTypeSpec`, 'UnionTypeSpec', 2, {isolate: false}));
testMappers.push(new TestMapper(`{} / UnionTypeSpec`, 'UnionTypeSpec', {}, {expectedValue: undefined, isolate: false}));


// ------------------------------------   Union types string | string[]   -------------------------------------------------


export type UnionTypeStringOrStringsSpec = string | string[];

testMappers.push(new TestMapper(`'a' / UnionTypeStringOrStringsSpec`, 'UnionTypeStringOrStringsSpec', 'a', {isolate: false}));
testMappers.push(new TestMapper(`['a', 'b'] / UnionTypeStringOrStringsSpec`, 'UnionTypeStringOrStringsSpec', ['a', 'b'], {isolate: false}));
testMappers.push(new TestMapper(`2 / UnionTypeStringOrStringsSpec / undefined`, 'UnionTypeStringOrStringsSpec', 2, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`['a', 2] / UnionTypeStringOrStringsSpec / ['a', undefined]`, 'UnionTypeStringOrStringsSpec', ['a', 2], {expectedValue: ['a', undefined], isolate: false}));



// --------------------------------------   Union types Class | string   --------------------------------------------------


export class ClassStringSpec {
    str: string
}
export type UnionClassStringOrNumberSpec = ClassStringSpec | number;

testMappers.push(new TestMapper(`'a' / UnionClassStringOrNumberSpec`, 'UnionClassStringOrNumberSpec', 'a', {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`2 / UnionClassStringOrNumberSpec`, 'UnionClassStringOrNumberSpec', 2, {isolate: false}));
testMappers.push(new TestMapper(`{str: 'a'} / UnionClassStringOrNumberSpec`, 'UnionClassStringOrNumberSpec', {str: 'a'}, {isolate: false}));
testMappers.push(new TestMapper(`{str: 2} / UnionClassStringOrNumberSpec`, 'UnionClassStringOrNumberSpec', {str: 2}, {expectedValue: {str: undefined}, isolate: false}));


// ---------------------------------   Union of two Classes, and one Class[]   --------------------------------------------


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
// TODO: implement behavior if mapped is defined but could be defined too in the other parts of the union type
// testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / Employer`, 'EmployerSpec',{name: 'Total', employees: 30000}, {isolate: true}));
// testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / EmployerSpec`, 'EmployerSpec',[{ name: 'Total', employees: 30000 }], {expectedValue: undefined, isolate: true}));
testMappers.push(new TestMapper(`[{ name: 'Total', volunteers: 3000 }] / EmployerSpec[]`, 'EmployerSpec[]',[{ name: 'Total', volunteers: 3000 }]));
