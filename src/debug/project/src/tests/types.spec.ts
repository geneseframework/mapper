import { TestMapper } from '../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];


// ------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------   Trivial types   -------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------



// -------------------------------------------------   literal   -----------------------------------------------------------

export type BlueType = 'Blue';
testMappers.push(new TestMapper(`'Blue' / BlueType`, 'BlueType', 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`'Blue' / BlueType`, 'BlueType', 'White', {expectedValue: undefined, isolate: false}));


// -------------------------------------------------   string   -----------------------------------------------------------


export type StringAloneSpec = string;
testMappers.push(new TestMapper(`'Blue' / StringAloneSpec`, 'StringAloneSpec', 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`3 / StringAloneSpec / undefined`, 'StringAloneSpec', 3, {expectedValue: undefined, isolate: false}));


// --------------------------------------   Type defined by another type   ------------------------------------------------


export type ParentTypeSpec = string;
export type ChildTypeSpec = ParentTypeSpec;

testMappers.push(new TestMapper(`'a' / ChildTypeSpecSpec`, 'ChildTypeSpec', 'a', {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildTypeSpecSpec / undefined`, 'ChildTypeSpec', 3, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`3 / ChildTypeSpecSpec / '3'`, 'ChildTypeSpec', 3, {expectedValue: '3', behavior: {castStringsAndNumbers: true}, isolate: false}));


// -----------------------------------------   Type defined by a Class   --------------------------------------------------


export class CompanyAloneClassSpec {
    name: string;
    employees: number;
}
export type CompanyAloneSpec = CompanyAloneClassSpec;


testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / CompanyAloneSpec`, 'CompanyAloneSpec', {name: 'Total', employees: 30000}, {isolate: false}));
testMappers.push(new TestMapper(`3 / CompanyAloneSpec / {}`, 'CompanyAloneSpec', 3, {expectedValue: undefined}));


// ------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------   Literal types   -------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------



// ----------------------------------------------   Simple literal type   -------------------------------------------------


export type TypeLiteralSpec = {name: string};

testMappers.push(new TestMapper(`{name: 'Léa'} / TypeLiteralSpec`, 'TypeLiteralSpec', {name: 'Léa'}, {isolate: false}));
testMappers.push(new TestMapper(`{name: 'Léa'} / TypeLiteralSpec`, 'TypeLiteralSpec', {name: 2}, {expectedValue: {name: undefined}, isolate: false}));
testMappers.push(new TestMapper(`{name: 'Léa'} / TypeLiteralSpec`, 'TypeLiteralSpec', {}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{name: 'Léa'} / TypeLiteralSpec`, 'TypeLiteralSpec', 'a', {expectedValue: undefined, isolate: false}));



// -------------------------------------------   Literal type with two keys   ---------------------------------------------


export type TypeLiteralToKeysSpec = {name: string, age: number};

testMappers.push(new TestMapper(`{name: 'Léa', age: 20} / TypeLiteralToKeysSpec`, 'TypeLiteralToKeysSpec', {name: 'Léa', age: 20}, {isolate: true}));
testMappers.push(new TestMapper(`{name: 'Léa', age: '20'} / TypeLiteralToKeysSpec / {name: 'Léa', age: undefined}`, 'TypeLiteralToKeysSpec', {name: 'Léa', age: '20'}, {expectedValue: {name: 'Léa', age: undefined}, isolate: true}));


// ------------------------------------------   Literal type without types  -----------------------------------------------


export type TypeLiteralWithoutTypesSpec = {name, age};

// TODO
// testMappers.push(new TestMapper(`{name: 'Léa'} / TypeLiteralWithoutTypesSpec`, 'TypeLiteralWithoutTypesSpec', {name: 'Léa'}, {isolate: true}));


// ----------------------------------------------   Nested literal type   -------------------------------------------------


export type TypeLiteralNestedSpec = {name: string, address: {country: string}};

testMappers.push(new TestMapper(`{name: 'Léa', address: {country: 'France'} / TypeLiteralNestedSpec`, 'TypeLiteralNestedSpec', {name: 'Léa', address: {country: 'France'}}, {isolate: false}));
testMappers.push(new TestMapper(`{address: {country: 'France'} / TypeLiteralNestedSpec`, 'TypeLiteralNestedSpec', {address: {country: 'France'}}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{name: 'Léa', address: {country: 'France'} / TypeLiteralNestedSpec`, 'TypeLiteralNestedSpec', {name: 'Léa', address: {country: 'France'}}, {isolate: false}));
testMappers.push(new TestMapper(`{name: 'Léa', address: {city: 'Montpellier'} / TypeLiteralNestedSpec`, 'TypeLiteralNestedSpec', {name: 'Léa', address: {city: 'Montpellier'}}, {expectedValue: { name: 'Léa', address: undefined }, isolate: false}));


// ----------------------------------------   Nested literal type with optional   -----------------------------------------


export type TypeLiteralNestedOptionalSpec = {name: string, address: {country: string, city?: string}};

testMappers.push(new TestMapper(`{name: 'Léa', address: {country: 'France', city: 'Montpellier'} / TypeLiteralNestedOptionalSpec`, 'TypeLiteralNestedOptionalSpec', {name: 'Léa', address: {country: 'France', city: 'Montpellier'}}, {isolate: false}));
testMappers.push(new TestMapper(`{address: {country: 'France', city: 'Montpellier'} / TypeLiteralNestedOptionalSpec`, 'TypeLiteralNestedOptionalSpec', {address: {country: 'France', city: 'Montpellier'}}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{name: 'Léa', address: {country: 'France'} / TypeLiteralNestedOptionalSpec`, 'TypeLiteralNestedOptionalSpec', {name: 'Léa', address: {country: 'France'}}, {isolate: false}));
testMappers.push(new TestMapper(`{name: 'Léa', address: {city: 'Montpellier'} / TypeLiteralNestedOptionalSpec`, 'TypeLiteralNestedOptionalSpec', {name: 'Léa', address: {city: 'Montpellier'}}, {expectedValue: { name: 'Léa', address: undefined }, isolate: false}));



// ------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------   Union types   --------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------   string | number   ------------------------------------------------------


testMappers.push(new TestMapper(`'Blue' / string | number`, 'string | number', 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`3 / string | number`, 'string | number', 3, {isolate: false}));



// --------------------------------------------   'Blue' | 'White'   ------------------------------------------------------


testMappers.push(new TestMapper(`'Blue' / 'Blue' | 'White'`, `'Blue' | 'White'`, 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`'Green' / 'Blue' | 'White'`, `'Blue' | 'White'`, 'Green', {expectedValue: undefined, isolate: false}));


// --------------------------------   Type defined with union of literal strings   ----------------------------------------


export type ColorsTypeSpec = 'Blue' | 'White';
testMappers.push(new TestMapper(`'Blue' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Blue', {isolate: false}));
testMappers.push(new TestMapper(`'Green' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Green', {expectedValue: undefined}));


// ---------------------------------------   Type defined by other types   -----------------------------------------------


export type Parent1TypeSpec = string;
export type Parent2TypeSpec = number;
export type ChildParentsTypeSpec = Parent1TypeSpec | Parent2TypeSpec;

testMappers.push(new TestMapper(`'a' / ChildParentsTypeSpec`, 'ChildParentsTypeSpec', 'a', {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildParentsTypeSpec`, 'ChildParentsTypeSpec', 3, {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildParentsTypeSpec / '3'`, 'ChildParentsTypeSpec', 3, {expectedValue: '3', behavior: {castStringsAndNumbers: false}, isolate: false}));
testMappers.push(new TestMapper(`{} / ChildParentsTypeSpec / undefined`, 'ChildParentsTypeSpec', {}, {expectedValue: undefined, behavior: {castStringsAndNumbers: false}, isolate: false}));


// ----------------------------------   Type defined by union with other types   ------------------------------------------


export type ParentNumberOrBooleanSpec = number | boolean;
export type ChildParentNumberOrBooleanAndStringSpec = ParentNumberOrBooleanSpec | string;

testMappers.push(new TestMapper(`'a' / ChildParentNumberOrBooleanAndStringSpec`, 'ChildParentNumberOrBooleanAndStringSpec', 'a', {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildParentNumberOrBooleanAndStringSpec`, 'ChildParentNumberOrBooleanAndStringSpec', 3, {isolate: false}));
testMappers.push(new TestMapper(`3 / ChildParentNumberOrBooleanAndStringSpec / '3'`, 'ChildParentNumberOrBooleanAndStringSpec', 3, {isolate: false}));
testMappers.push(new TestMapper(`{} / ChildParentNumberOrBooleanAndStringSpec / undefined`, 'ChildParentNumberOrBooleanAndStringSpec', {}, {expectedValue: undefined, behavior: {castStringsAndNumbers: false}, isolate: false}));


// ----------------------------------------   Union types 0 | 1 | 2   -----------------------------------------------------


export type UnionTypeNumberLiteralSpec = 0 | 1 | 2;

testMappers.push(new TestMapper(`0 / UnionTypeNumberLiteralSpec`, 'UnionTypeNumberLiteralSpec', 0, {isolate: false}));
testMappers.push(new TestMapper(`2 / UnionTypeNumberLiteralSpec`, 'UnionTypeNumberLiteralSpec', 2, {isolate: false}));
testMappers.push(new TestMapper(`'a' / UnionTypeNumberLiteralSpec / undefined`, 'UnionTypeNumberLiteralSpec', 'a', {expectedValue: undefined, isolate: false}));
// TODO: fix
testMappers.push(new TestMapper(`'2' / UnionTypeNumberLiteralSpec & !diff / 2`, 'UnionTypeNumberLiteralSpec', '2', {expectedValue: undefined, behavior: {castStringsAndNumbers: false}, isolate: false}));
testMappers.push(new TestMapper(`'2' / UnionTypeNumberLiteralSpec & !diff / 2`, 'UnionTypeNumberLiteralSpec', '2', {expectedValue: 2, behavior: {castStringsAndNumbers: true}, isolate: false}));


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



// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------   Intersection types   ------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------



// --------------------------------------------   Mandatory keys   --------------------------------------------------------


export type IntersectionMandatoryLeftTypeSpec = {name: string};
export type IntersectionMandatoryRightTypeSpec = {age: number};
export type IntersectionMandatoryTypeSpec = IntersectionMandatoryLeftTypeSpec & IntersectionMandatoryRightTypeSpec;

testMappers.push(new TestMapper(`{name: 'a', age: 20} / IntersectionMandatoryTypeSpec`, 'IntersectionMandatoryTypeSpec',{name: 'a', age: 20}, {isolate: false}));
testMappers.push(new TestMapper(`{name: 'a'} / IntersectionMandatoryTypeSpec / undefined`, 'IntersectionMandatoryTypeSpec',{name: 'a'}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{} / IntersectionMandatoryTypeSpec / undefined`, 'IntersectionMandatoryTypeSpec',{}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`'a' / IntersectionMandatoryTypeSpec / undefined`, 'IntersectionMandatoryTypeSpec','a', {expectedValue: undefined, isolate: false}));


// -------------------------------------------   Optional keys   --------------------------------------------------------


export type IntersectionOptionalLeftTypeSpec = {name: string};
export type IntersectionOptionalRightTypeSpec = {age: number, city?: string};
export type IntersectionOptionalTypeSpec = IntersectionOptionalLeftTypeSpec & IntersectionOptionalRightTypeSpec;

testMappers.push(new TestMapper(`{name: 'a', age: 20} / IntersectionOptionalTypeSpec`, 'IntersectionOptionalTypeSpec',{name: 'a', age: 20}, {isolate: false}));
testMappers.push(new TestMapper(`{name: 'a', age: 20, city: 'Bamako'} / IntersectionOptionalTypeSpec / undefined`, 'IntersectionOptionalTypeSpec',{name: 'a', age: 20, city: 'Bamako'}, {isolate: false}));
testMappers.push(new TestMapper(`{name: 'a', city: 'Bamako'} / IntersectionOptionalTypeSpec / undefined`, 'IntersectionOptionalTypeSpec',{name: 'a', city: 'Bamako'}, {expectedValue: undefined, isolate: false}));



// ------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------   Other complex types   ------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------



// -------------------------------------------   Function types   ------------------------------------------------------

// TODO: function types

export type FunctionTypeSpec = () => string;

// testMappers.push(new TestMapper(`() => 'a' / FunctionTypeSpec`, 'FunctionTypeSpec',() => 'a', {isolate: true}));



// TODO : fix behavior of union of classes methods

// export class CompanyAloneClassSpec {
//     name: string;
//     employees: number;
//
//     createAndReturnInterfaceInfoWithTypeLiteralNode() {
//         console.log(chalk.red('zzzZZZZZZ'), this.name);
//     }
// }
// export type CompanyAloneSpec = CompanyAloneClassSpec;
//
// const aaa: CompanyAloneClassSpec = create('CompanyAloneSpec', {name: 'sssss'});
// aaa.createAndReturnInterfaceInfoWithTypeLiteralNode();
//
// export class Cattt {
//     color: string;
//
//     meaow() {
//         console.log(chalk.red('MEAOWWWW'));
//     }
// }
//
// export type ggg = CompanyAloneClassSpec | Cattt;
//
// const mmm: any = create('ggg', {name: 'fff'});
// // mmm.createAndReturnInterfaceInfoWithTypeLiteralNode();
// // mmm.meaow();
// // TODO : ppp.meaow() should run
// const ppp: any = create('ggg', {color: 'reddd'});
// // ppp.createAndReturnInterfaceInfoWithTypeLiteralNode();
// // ppp.meaow();




