import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Chalk } from 'chalk';

export const testMappers: TestMapper[] = [];


// ----------------------------------------   Class with property of type Class   -----------------------------------------

export class CatSpec {
    name: string;
}
export class PersonCatSpec {
    age: number;
    cat: CatSpec;
    firstName: string;
}

testMappers.push(new TestMapper(`{name: 'Cibi'} / CatSpec`, CatSpec, {name: 'Cibi'}));
testMappers.push(new TestMapper(`{cat: {name: 'Cibi'}, firstName: 'Léa'} / PersonCatSpec`, PersonCatSpec, {cat: {name: 'Cibi'}, firstName: 'Léa'}));
testMappers.push(new TestMapper(`{cat: {name: 'Cibi'}, firstName: 'Léa'} / PersonCatSpec / {cat: {name: 'Cibi'}, firstName: 'Léa'}`, PersonCatSpec, {cat: {name: 'Cibi', otherProperty: 'a'}, firstName: 'Léa'}, {expectedValue: {cat: {name: 'Cibi'}, firstName: 'Léa'}}));
testMappers.push(new TestMapper(`{cat: undefined, firstName: 'Léa'} / PersonCatSpec`, PersonCatSpec, {cat: undefined, firstName: 'Léa'}));
testMappers.push(new TestMapper(`{} / PersonCatSpec / new PersonCatSpec()`, PersonCatSpec, {}, {expectedValue: new PersonCatSpec()}));
testMappers.push(new TestMapper(`'a' / PersonCatSpec / new PersonCatSpec()`, PersonCatSpec, 'a', {expectedValue: undefined}));
testMappers.push(new TestMapper(`{cat: new CatSpec(), firstName: 'Léa'} / PersonCatSpec / new PersonCatSpec()`, PersonCatSpec, {cat: new CatSpec(), firstName: 'Léa'}));
testMappers.push(new TestMapper(`[new CatSpec()] / PersonCatSpec / [new CatSpec()]`, PersonCatSpec, [new CatSpec()], {expectedValue: undefined}));
testMappers.push(new TestMapper(`[new PersonCatSpec()] / PersonCatSpec / [new PersonCatSpec()]`, PersonCatSpec, [new PersonCatSpec()], {expectedValue: undefined}));


// --------------------------------------   Not differentiate string and numbers   ----------------------------------------


const personWithCorrectTypes = new PersonCatSpec();
personWithCorrectTypes.age = 49;
personWithCorrectTypes.firstName = 'Léo';

testMappers.push(new TestMapper(`personWithCorrectTypes / PersonCatSpec`, PersonCatSpec, personWithCorrectTypes, {isolate: false}));
testMappers.push(new TestMapper(`{age: 49, firstName: 'Léo'} / PersonCatSpec`, PersonCatSpec, {age: 49, firstName: 'Léo'}));

const age: string | number = '49';
const personWithWrongTypes = new PersonCatSpec();
personWithWrongTypes.age = age as unknown as number;
personWithWrongTypes.firstName = 2 as unknown as string;

testMappers.push(new TestMapper(`{age: '49', firstName: 2} / PersonCatSpec / personWithWrongTypes`, PersonCatSpec, {age: '49', firstName: 2}, {expectedValue: personWithWrongTypes, createOptions: {differentiateStringsAndNumbers: false}}));


// -------------------------------------------------------------------------------------------------


export class ClassWithPrimitivesSpec {
    str: string;
    num: number;
    bool: boolean;
    strs: string[];
    nums: number[];
    bools: boolean[];
}

testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec`, ClassWithPrimitivesSpec, {str: 'str', num: 2, bool: true, strs: ['str1', 'str2'], nums: [1, 2], bools: [true, false] }));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec / {bool: null }`, ClassWithPrimitivesSpec, {str: 3, num: 'num', bool: null}, {expectedValue: {bool: null }}));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec / {strs:[null], nums: [undefined], bools: [undefined]}`, ClassWithPrimitivesSpec, {strs: [1, null], nums: ['2', undefined], bools: ['a', undefined]}, {expectedValue: {strs:[null], nums: [undefined], bools: [undefined]}}));


// -------------------------------------------------------------------------------------------------


export class ClassWithAnySpec {
    a: any;
    b: any[];
    c;
}

testMappers.push(new TestMapper(` {a: 2, b: ['b'], c: 'c'} / ClassWithAnySpec`, ClassWithAnySpec, {a: 2, b: ['b'], c: 'c'}));
testMappers.push(new TestMapper(` {a: undefined, b: 'b'} / ClassWithAnySpec / {a: undefined }`, ClassWithAnySpec, {a: undefined, b: 'b'}, {expectedValue: {a: undefined } }));
testMappers.push(new TestMapper(` {a: [2], b: [null]} / ClassWithAnySpec`, ClassWithAnySpec, {a: [2], b: [null]}));
testMappers.push(new TestMapper(` {d: 3 } / ClassWithAnySpec`, ClassWithAnySpec, {d: 3}, {expectedValue: {}}));


// -------------------------------------------------------------------------------------------------


export class IndexableSpec {
    a: string;
    [key: string]: string;
}

testMappers.push(new TestMapper(` {a: 'a', b: 'b'} / IndexableSpec`, IndexableSpec, {a: 'a', b: 'b'}));
testMappers.push(new TestMapper(` {a: 'a', b: 3 } / IndexableSpec / {a: 'a'}`, IndexableSpec, {a: 'a', b: 3}, {expectedValue: {a: 'a'}}));


// -------------------------------------------------------------------------------------------------


export class IndexableNumberSpec {
    a: string;
    [key: number]: string;
}

testMappers.push(new TestMapper(` {a: 'a', 2: 'b'} / IndexableNumberSpec / {a: 'a'}`, IndexableNumberSpec, {a: 'a', 2: 'b'}, {expectedValue: {a: 'a'}}));
testMappers.push(new TestMapper(` {a: 'a', b: 3 } / IndexableNumberSpec / {a: 'a'}`, IndexableNumberSpec, {a: 'a', b: 3}, {expectedValue: {a: 'a'}}));


// -------------------------------------------------------------------------------------------------


export class ValuesByDefault {
    a = 'aaa';
    b = 2;
    c = false;
    d = true;
}

testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'aaa', b: 2, c: false, d: true}`, ValuesByDefault, {}, {expectedValue: {a: 'aaa', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'z', b: 2, c: false, d: true}`, ValuesByDefault, {a: 'z'}, {expectedValue: {a: 'z', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'z', b: 2, c: false, d: true}`, ValuesByDefault, undefined));



// -----------------------------------------------   Constructor with values   --------------------------------------------


export class ValuesOnConstructor {
    a;
    b;
    c;
    d;

    constructor(a = 'aaa', b = 2, c = false, d = true) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
}

testMappers.push(new TestMapper(` {} / ValuesOnConstructor / {a: 'aaa', b: 2, c: false, d: true}`, ValuesOnConstructor, {}, {expectedValue: {a: 'aaa', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesOnConstructor / {a: 'z', b: 2, c: false, d: true}`, ValuesOnConstructor, {a: 'z'}, {expectedValue: {a: 'z', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesOnConstructor / {a: 'z', b: 2, c: false, d: true}`, ValuesOnConstructor, undefined));


// --------------------------------------------------   External Module   -------------------------------------------------


testMappers.push(new TestMapper(`{color: 'White'} / Chalk / undefined`, 'Chalk', {color: 'White'}, {expectedValue: undefined }));


// -----------------------------------------------------   Heritage   -----------------------------------------------------


export class ParentClassSpec {
    name: string;
    constructor(name: string) {
        this.name = name ?? 'unknown';
    }
}
export class ChildClassSpec extends ParentClassSpec {
    color: string;
    constructor(name: string, color: string) {
        super(name);
        this.color = color;
    }
}
testMappers.push(new TestMapper(`{color: 'White'} / ChildClassSpec / {color: 'White', name: 'unknown'}`, ChildClassSpec, {color: 'White'}, {expectedValue: {color: 'White', name: 'unknown'}}));
testMappers.push(new TestMapper(`{} / ChildClassSpec / {color: undefined, name: 'unknown'}`, ChildClassSpec, {}, {expectedValue: {color: undefined, name: 'unknown'}}));


// -------------------------------------------   Property with Union Type   -----------------------------------------------

export type UnionTypeClassAndStringSpec = CatSpec | string;
export class ClassWithUnionTypeSpec {
    union: UnionTypeClassAndStringSpec;
}
const catSpec = new CatSpec();
catSpec.name = 'Biela';

testMappers.push(new TestMapper(`{union: undefined} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, {union: undefined}));
testMappers.push(new TestMapper(`{union: 'a'} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, {union: 'a'}));
testMappers.push(new TestMapper(`{union: 'a'} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, new ClassWithUnionTypeSpec()));
testMappers.push(new TestMapper(`{union: 'a'} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, {union: new CatSpec()}));
testMappers.push(new TestMapper(`{union: 'a'} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, {union: catSpec}));


// --------------------------------------------------   Abstract   --------------------------------------------------------


export abstract class AbstractParentClassSpec {
    name: string;
    protected constructor(name: string) {
        this.name = name ?? 'unknown';
    }
}
export class ChildAbstractClassSpec extends AbstractParentClassSpec {
    color: string;
    constructor(name: string, color: string) {
        super(name);
        this.color = color;
    }
}
testMappers.push(new TestMapper(`{color: 'White'} / ChildAbstractClassSpec / {color: 'White', name: 'unknown'}`, ChildAbstractClassSpec, {color: 'White'}, {expectedValue: {color: 'White', name: 'unknown'}}));
testMappers.push(new TestMapper(`{} / ChildAbstractClassSpec / {color: undefined, name: 'unknown'}`, ChildAbstractClassSpec, {}, {expectedValue: {color: undefined, name: 'unknown'}}));
testMappers.push(new TestMapper(`{} / AbstractParentClassSpec / undefined`, 'AbstractParentClassSpec', {}, {expectedValue: undefined}));


// --------------------------------------   Default value on Interface property   -----------------------------------------

export interface IDefaultsSpec {
    name?: string
}
export class CDefaultsSpec {
    person: IDefaultsSpec = {
        name: 'Léa'
    }
}

testMappers.push(new TestMapper(`{person: {}} / CDefaultsSpec / new CDefaultsSpec()`, CDefaultsSpec, {person: {}}, {expectedValue: new CDefaultsSpec()}));


// ------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------   Classes with property having Type   ------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------


// ---------------------------------   Property typed with type: string[] or string ---------------------------------------


export type StringsOrStringSpec = string[] | string;
export class PaintStringsOrStringSpec {
    colors: StringsOrStringSpec;
}

testMappers.push(new TestMapper(`{colors: 'Blue'} / PaintStringsOrStringSpec`, PaintStringsOrStringSpec, {colors: 'Blue'}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / PaintStringsOrStringSpec / {}`, PaintStringsOrStringSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{colors: ['Blue', 'White']} / PaintStringsOrStringSpec`, PaintStringsOrStringSpec, {colors: ['Blue', 'White']}));


// ------------------------   Class with property typed with type: string or string[] -------------------------------------


export type StringOrStringsSpec = string | string[];
export class PaintStringOrStringsSpec {
    colors: StringOrStringsSpec;
}

testMappers.push(new TestMapper(`{colors: 'Blue'} / PaintStringOrStringsSpec`, PaintStringOrStringsSpec, {colors: 'Blue'}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / PaintStringOrStringsSpec / {}`, PaintStringOrStringsSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{colors: ['Blue', 'White']} / PaintStringOrStringsSpec`, PaintStringOrStringsSpec, {colors: ['Blue', 'White']}));


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


// -----------------------------------   Union of two Classes, and one Class[]   ------------------------------------------


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


// testMappers.push(new TestMapper(`{name: 'Greenpeace', volunteers: 3000} / Employer`, 'EmployerSpec',{name: 'Greenpeace', volunteers: 3000}));
// testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / Employer`, 'EmployerSpec',{name: 'Total', employees: 30000}));
// testMappers.push(new TestMapper(`{name: 'Total', employees: 30000} / EmployerSpec`, 'EmployerSpec',[{ name: 'Total', employees: 30000 }], {expectedValue: undefined}));
// testMappers.push(new TestMapper(`[{ name: 'Total', volunteers: 3000 }] / EmployerSpec[]`, 'EmployerSpec[]',[{ name: 'Total', volunteers: 3000 }]));
testMappers.push(new TestMapper(`{employer: { name: 'Total', employees: 30000 }} / PersonSpec`, PersonSpec,{employer: { name: 'Total', employees: 30000 }}));
testMappers.push(new TestMapper(`{employer: [{ name: 'Total', employees: 30000 }]} / PersonSpec`, PersonSpec,{employer: [{ name: 'Total', employees: 30000 }]}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{employer: { name: 'Greenpeace', volunteers: 3000 }} / PersonSpec`, PersonSpec,{employer: [{ name: 'Greenpeace', volunteers: 3000 }]}));
