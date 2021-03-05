import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Chalk } from 'chalk';

export const testMappers: TestMapper[] = [];


// ------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------   Primitives and default values   ---------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------


// --------------------------------------------------   Primitives   ------------------------------------------------------


export class ClassWithPrimitivesSpec {
    str: string;
    num: number;
    bool: boolean;
    strs: string[];
    nums: number[];
    bools: boolean[];
}

testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec`, ClassWithPrimitivesSpec, {str: 'str', num: 2, bool: true, strs: ['str1', 'str2'], nums: [1, 2], bools: [true, false]}));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec / {bool: null}`, ClassWithPrimitivesSpec, {str: 3, num: 'num', bool: null}, {expectedValue: {str: undefined, num: undefined, bool: null}}));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec / ClassWithPrimitivesSpec / {strs:[null], nums: [undefined], bools: [undefined]}`, ClassWithPrimitivesSpec, {strs: [1, null], nums: ['2', undefined], bools: ['a', undefined]}, {expectedValue: {strs:[null], nums: [undefined], bools: [undefined]}}));


// -----------------------------------------------------   any   ----------------------------------------------------------


export class ClassWithAnySpec {
    a: any;
    b: any[];
    c;
}

testMappers.push(new TestMapper(` {a: 2, b: ['b'], c: 'c'} / ClassWithAnySpec`, ClassWithAnySpec, {a: 2, b: ['b'], c: 'c'}));
testMappers.push(new TestMapper(` {a: undefined, b: 'b'} / ClassWithAnySpec / {a: undefined, b: undefined}`, ClassWithAnySpec, {a: undefined}, {expectedValue: {a: undefined}}));
testMappers.push(new TestMapper(` {a: [2], b: [null]} / ClassWithAnySpec`, ClassWithAnySpec, {a: [2], b: [null]}));
testMappers.push(new TestMapper(` {d: 3} / ClassWithAnySpec`, ClassWithAnySpec, {d: 3}, {expectedValue: {}}));


// ------------------------------------------------   Indexable string   --------------------------------------------------


export class IndexableSpec {
    a: string;
    [key: string]: string;
}

testMappers.push(new TestMapper(` {a: 'c', b: 'd'} / IndexableSpec`, IndexableSpec, {a: 'c', b: 'd'}));
testMappers.push(new TestMapper(` {a: 'c', b: 3} / IndexableSpec / {a: 'c'}`, IndexableSpec, {a: 'c', b: 3}, {expectedValue: {a: 'c'}}));


// ------------------------------------------------   Indexable number   --------------------------------------------------


export class IndexableNumberSpec {
    a: string;
    [key: number]: string;
}

testMappers.push(new TestMapper(` {a: 'a', 2: 'b'} / IndexableNumberSpec / {a: 'a'}`, IndexableNumberSpec, {a: 'a', 2: 'b'}, {expectedValue: {a: 'a'}}));
testMappers.push(new TestMapper(` {a: 'a', b: 3} / IndexableNumberSpec / {a: 'a'}`, IndexableNumberSpec, {a: 'a', b: 3}, {expectedValue: {a: 'a'}}));


// --------------------------------------------------   Default values   --------------------------------------------------


export class ValuesByDefault {
    a = 'aaa';
    b = 2;
    c = false;
    d = true;
}

testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'aaa', b: 2, c: false, d: true}`, ValuesByDefault, {}, {expectedValue: {a: 'aaa', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'z', b: 2, c: false, d: true}`, ValuesByDefault, {a: 'z'}, {expectedValue: {a: 'z', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {} / ValuesByDefault / {a: 'z', b: 2, c: false, d: true}`, ValuesByDefault, undefined));



// --------------------------------------------   Constructor with default values   ---------------------------------------


export class ValuesOnConstructor {
    a;
    b;
    c;
    d;

    constructor(a = 'aaa', b = 2, c = false, d = true) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;}
}

testMappers.push(new TestMapper(` {} / ValuesOnConstructor / {a: 'aaa', b: 2, c: false, d: true}`, ValuesOnConstructor, {}, {expectedValue: {a: 'aaa', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` {a: 'z'} / ValuesOnConstructor / {a: 'z', b: 2, c: false, d: true}`, ValuesOnConstructor, {a: 'z'}, {expectedValue: {a: 'z', b: 2, c: false, d: true}}));
testMappers.push(new TestMapper(` undefined / ValuesOnConstructor / {a: 'z', b: 2, c: false, d: true}`, ValuesOnConstructor, undefined));


// ------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------   Properties of type Class or Interface  ---------------------------------------
// ------------------------------------------------------------------------------------------------------------------------


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


// --------------------------------------------   Cast string and numbers   -----------------------------------------------


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


// --------------------------------------------------   External Module   -------------------------------------------------


testMappers.push(new TestMapper(`{color: 'White'} / Chalk / undefined`, 'Chalk', {color: 'White'}, {expectedValue: undefined}));


// -----------------------------------------------------   Heritage   -----------------------------------------------------


export class ParentClassSpec {
    name: string;
    constructor(name: string) {
        this.name = name ?? 'unknown';}
}
export class ChildClassSpec extends ParentClassSpec {
    color: string;
    constructor(name: string, color: string) {
        super(name);
        this.color = color;}
}
testMappers.push(new TestMapper(`{color: 'White'} / ChildClassSpec / {color: 'White', name: 'unknown'}`, ChildClassSpec, {color: 'White'}, {expectedValue: {color: 'White', name: 'unknown'}}));
testMappers.push(new TestMapper(`{} / ChildClassSpec / {color: undefined, name: 'unknown'}`, ChildClassSpec, {}, {expectedValue: {color: undefined, name: 'unknown'}}));


// --------------------------------------------------   Abstract   --------------------------------------------------------


export abstract class AbstractParentClassSpec {
    name: string;
    protected constructor(name: string) {
        this.name = name ?? 'unknown';}
}
export class ChildAbstractClassSpec extends AbstractParentClassSpec {
    color: string;
    constructor(name: string, color: string) {
        super(name);
        this.color = color;}
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

testMappers.push(new TestMapper(`{person: {}} / CDefaultsSpec / new CDefaultsSpec()`, CDefaultsSpec, {}, {expectedValue: new CDefaultsSpec()}));
testMappers.push(new TestMapper(`{person: {}} / CDefaultsSpec / new CDefaultsSpec()`, CDefaultsSpec, {person: {}}));


// ------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------   Classes with property having Type   ------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------


// -----------------------------------   Property typed with type: string | number   ---------------------------------------


export class StringOrNumberClassSpec {
    age: string | number;
}

testMappers.push(new TestMapper(`{age: 2} / StringOrNumberClassSpec`, StringOrNumberClassSpec, {age: 2}, {isolate: false}));
testMappers.push(new TestMapper(`{age: '2'} / StringOrNumberClassSpec`, StringOrNumberClassSpec, {age: '2'}, {isolate: false}));
testMappers.push(new TestMapper(`{age: [2]} / StringOrNumberClassSpec`, StringOrNumberClassSpec, {age: [2]}, {isolate: false}));


// ----------------------------------------------   Null or Literal   ------------------------------------------------------


export class NullSpec {
    prop: null;
}
testMappers.push(new TestMapper(`{prop: 1} / NullSpec / {prop: null}`, NullSpec, {prop: 1}, {expectedValue: {prop: null}, isolate: false}));


export class UndefinedSpec {
    prop: undefined;
}
testMappers.push(new TestMapper(`{prop: 1} / UndefinedSpec / {prop: 1}`, UndefinedSpec, {prop: 1}, {expectedValue: {prop: 1}, isolate: false}));


export class UnknownSpec {
    prop: unknown;
}
testMappers.push(new TestMapper(`{prop: 1} / UnknownSpec / {prop: 1}`, UnknownSpec, {prop: 1}, {expectedValue: {prop: 1}, isolate: false}));


export class NumberLiteralSpec {
    prop: 4;
}
testMappers.push(new TestMapper(`{prop: 'a'} / NumberLiteralSpec / {prop: 4}`, NumberLiteralSpec, {prop: 'a'}, {expectedValue: {prop: 4}, isolate: false}));


export class StringLiteralSpec {
    prop: 'a';
}
testMappers.push(new TestMapper(`{prop: 4} / StringLiteralSpec / {prop: 'a'}`, StringLiteralSpec, {prop: 4}, {expectedValue: {prop: 'a'}, isolate: false}));

export class BooleanLiteralSpec {
    prop: false;
}
testMappers.push(new TestMapper(`{prop: false} / BooleanLiteralSpec / {prop: 4}`, BooleanLiteralSpec, {prop: false}, {expectedValue: {prop: false}, isolate: false}));

// TODO -----------------------------------
export class ObjectLiteralSpec {
    prop: {str: 'a'}
}


// ----------------------------------   Property typed with type: string[] or string ---------------------------------------


export type StringsOrStringSpec = string[] | string;
export class PaintStringsOrStringSpec {
    colors: StringsOrStringSpec;
}

testMappers.push(new TestMapper(`{colors: 'Blue'} / PaintStringsOrStringSpec`, PaintStringsOrStringSpec, {colors: 'Blue'}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / PaintStringsOrStringSpec / {}`, PaintStringsOrStringSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{colors: ['Blue', 'White']} / PaintStringsOrStringSpec`, PaintStringsOrStringSpec, {colors: ['Blue', 'White']}));


// ----------------------------   Class with property typed with type: string or string[] ---------------------------------


export type StringOrStringsSpec = string | string[];
export class PaintStringOrStringsSpec {
    colors: StringOrStringsSpec;
}

testMappers.push(new TestMapper(`{colors: 'Blue'} / PaintStringOrStringsSpec`, PaintStringOrStringsSpec, {colors: 'Blue'}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / PaintStringOrStringsSpec / {}`, PaintStringOrStringsSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{colors: ['Blue', 'White']} / PaintStringOrStringsSpec`, PaintStringOrStringsSpec, {colors: ['Blue', 'White']}));


// ---------------------------------   Property typed with type: number[] or number ---------------------------------------


export type NumbersOrNumberSpec = number[] | number;
export class AgeNumbersOrNumberSpec {
    ages: NumbersOrNumberSpec;
}

testMappers.push(new TestMapper(`{ages: 2} / AgeNumbersOrNumberSpec`, AgeNumbersOrNumberSpec, {ages: 2}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / AgeNumbersOrNumberSpec / {}`, AgeNumbersOrNumberSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{ages: [4, 6]} / AgeNumbersOrNumberSpec`, AgeNumbersOrNumberSpec, {ages: [4, 6]}));


// ----------------------------   Class with property typed with type: number or number[] ---------------------------------


export type NumberOrNumbersSpec = number | number[];
export class AgeNumberOrNumbersSpec {
    ages: NumberOrNumbersSpec;
}

testMappers.push(new TestMapper(`{ages: 2} / AgeNumberOrNumbersSpec`, AgeNumberOrNumbersSpec, {ages: 2}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / AgeNumberOrNumbersSpec / {}`, AgeNumberOrNumbersSpec, {unknownProperty: 'Blue'}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{ages: [4, 6]} / AgeNumberOrNumbersSpec`, AgeNumberOrNumbersSpec, {ages: [4, 6]}));
testMappers.push(new TestMapper(`{ages: [4, 6]} / AgeNumberOrNumbersSpec`, AgeNumberOrNumbersSpec, {ages: ['rtty', 6]}, {expectedValue: {ages: [6]}}));


// -----------------------------   Class with property typed with type literal 1 | 2 | 3   --------------------------------


export type LevelSpec = 1 | 2 | 3;
export class LevelClassSpec {
    level: LevelSpec
}

testMappers.push(new TestMapper(`{level: 1} / LevelClassSpec`, LevelClassSpec, {level: 1}));


// --------------------------------------   Property with Type which is Union Type   --------------------------------------

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



// ------------------------------   Property with Type which is Union of Classes and Class[]   ----------------------------


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

testMappers.push(new TestMapper(`{employer: { name: 'Total', employees: 30000}} / PersonSpec`, PersonSpec,{employer: { name: 'Total', employees: 30000}}, {isolate: false}));
testMappers.push(new TestMapper(`{employer: [{ name: 'Total', employees: 30000}]} / PersonSpec`, PersonSpec,{employer: [{ name: 'Total', employees: 30000}]}, {expectedValue: {}}));
testMappers.push(new TestMapper(`{employer: { name: 'Greenpeace', volunteers: 3000}} / PersonSpec`, PersonSpec,{employer: [{ name: 'Greenpeace', volunteers: 3000}]}));
