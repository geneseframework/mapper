import { TestMapper } from '../../../test-engine/test-mapper.model';
import { Chalk } from 'chalk';

export const testMappers: TestMapper[] = [];


// ------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------   Primitives and default initializers   ----------------------------------------
// ------------------------------------------------------------------------------------------------------------------------


// --------------------------------------------   One primitive property   ------------------------------------------------


export class OnePrimitiveClassSpec {
    prop: string;
}

testMappers.push(new TestMapper(`{prop: 'a'} / OnePrimitiveClassSpec`, OnePrimitiveClassSpec, {prop: 'a'}, {isolate: false}));
testMappers.push(new TestMapper(`{} / OnePrimitiveClassSpec / undefined`, OnePrimitiveClassSpec, {}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`'a' / OnePrimitiveClassSpec / undefined`, OnePrimitiveClassSpec, 'a', {expectedValue: undefined, isolate: false}));



// --------------------------------------------   One primitive optional property   ------------------------------------------------


export class OnePrimitiveOptionalClassSpec {
    prop?: string;
}

testMappers.push(new TestMapper(`{prop: 'a'} / OnePrimitiveOptionalClassSpec`, OnePrimitiveOptionalClassSpec, {prop: 'a'}, {isolate: false}));
testMappers.push(new TestMapper(`{} / OnePrimitiveOptionalClassSpec / {}`, OnePrimitiveOptionalClassSpec, {}, {expectedValue: {}, isolate: false}));
testMappers.push(new TestMapper(`'a' / OnePrimitiveOptionalClassSpec / undefined`, OnePrimitiveOptionalClassSpec, 'a', {expectedValue: undefined, isolate: false}));



// --------------------------------------------------   Primitives   ------------------------------------------------------


export class ClassWithPrimitivesSpec {
    str: string;
    num: number;
    bool: boolean;
    strs: string[];
    nums: number[];
    bools: boolean[];
}

testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec 1 / ClassWithPrimitivesSpec`, ClassWithPrimitivesSpec, {str: 'str', num: 2, bool: true, strs: ['str1', 'str2'], nums: [1, 2], bools: [true, false]}));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec 2 / ClassWithPrimitivesSpec / undefined`, ClassWithPrimitivesSpec, {str: 3, num: 'num', bool: null}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`valid ClassWithPrimitivesSpec 3 / ClassWithPrimitivesSpec / undefined`, ClassWithPrimitivesSpec, {strs: [1, null], nums: ['2', undefined], bools: ['a', undefined]}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`'a' / ClassWithPrimitivesSpec / undefined`, ClassWithPrimitivesSpec,  'a', {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{otherProp: 2} / ClassWithPrimitivesSpec / undefined`, ClassWithPrimitivesSpec,  {otherProp: 2}, {expectedValue: undefined, isolate: false}));


// -----------------------------------------------------   any   ----------------------------------------------------------


export class ClassWithAnySpec {
    a: any;
    b: any[];
    c;
}

testMappers.push(new TestMapper(`{a: 2, b: ['b'], c: 'c'} / ClassWithAnySpec`, ClassWithAnySpec, {a: 2, b: ['b'], c: 'c'}, {isolate: false}));
testMappers.push(new TestMapper(`{a: undefined, b: 'b'} / ClassWithAnySpec / {a: undefined, b: undefined}`, ClassWithAnySpec, {a: undefined}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`{a: [2], b: [null], c: 2} / ClassWithAnySpec`, ClassWithAnySpec, {a: [2], b: [null], c: 2}));
testMappers.push(new TestMapper(`{a: [2], b: [null]} / ClassWithAnySpec`, ClassWithAnySpec, {a: [2], b: [null]}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`{d: 3} / ClassWithAnySpec`, ClassWithAnySpec, {d: 3}, {expectedValue: undefined}));


// ------------------------------------------------   Indexable string   --------------------------------------------------


export class IndexableSpec {
    a: string;
    [key: string]: string;
}

testMappers.push(new TestMapper(`{a: 'c', b: 'd'} / IndexableSpec`, IndexableSpec, {a: 'c', b: 'd'}, {isolate: false}));
testMappers.push(new TestMapper(`{a: 'c', b: 3} / IndexableSpec / {a: 'c', b: undefined}`, IndexableSpec, {a: 'c', b: 3}, {expectedValue: undefined, isolate: false}));


// ------------------------------------------------   Indexable number   --------------------------------------------------


export class IndexableNumberSpec {
    a: string;
    [key: number]: string;
}

testMappers.push(new TestMapper(`{a: 'a', 2: 'b'} / IndexableNumberSpec`, IndexableNumberSpec, {a: 'a', 2: 'b'}, {isolate: false}));
testMappers.push(new TestMapper(`{a: 'a', b: 3} / IndexableNumberSpec / {a: 'a'}`, IndexableNumberSpec, {a: 'a', b: 3}, {expectedValue: {a: 'a'}, isolate: false}));
testMappers.push(new TestMapper(`{a: 'a', 0: 3, 1: 'b'} / IndexableNumberSpec / {a: 'a', 0: undefined, 1: 'b'}`, IndexableNumberSpec, {a: 'a', 0: 3, 1: 'b'}, {expectedValue: undefined, isolate: false}));


// --------------------------------------------------   Default initializers   --------------------------------------------------


export class ValuesByDefault {
    a = 'aaa';
    b = 2;
    c = false;
    d = true;
}

testMappers.push(new TestMapper(`{} / ValuesByDefault / {a: 'aaa', b: 2, c: false, d: true}`, ValuesByDefault, {}, {expectedValue: {a: 'aaa', b: 2, c: false, d: true}, isolate: false}));
testMappers.push(new TestMapper(`{} / ValuesByDefault / {a: 'z', b: 2, c: false, d: true}`, ValuesByDefault, {a: 'z'}, {expectedValue: {a: 'z', b: 2, c: false, d: true}, isolate: false}));
testMappers.push(new TestMapper(`{} / ValuesByDefault / {a: 'z', b: 2, c: false, d: true}`, ValuesByDefault, undefined));


// --------------------------------------------   Constructor with default initializers   ---------------------------------------


export class ValuesOnConstructor {
    a;

    constructor(a = 'aaa') {
        this.a = a;
    }
}

testMappers.push(new TestMapper(`{a: 'z'} / ValuesOnConstructor / {a: 'z'}`, ValuesOnConstructor, {a: 'z'}, {expectedValue: {a: 'z'}, isolate: false}));
testMappers.push(new TestMapper(`{} / ValuesOnConstructor / undefined`, ValuesOnConstructor, {}, {expectedValue: undefined, isolate: false}));


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
testMappers.push(new TestMapper(`{cat: {name: 'Cibi'}, firstName: 'Léa', age: 20} / PersonCatSpec`, PersonCatSpec, {cat: {name: 'Cibi'}, firstName: 'Léa', age: 20}, {isolate: false}));
testMappers.push(new TestMapper(`{cat: {name: 'Cibi'}, firstName: 'Léa'} / PersonCatSpec`, PersonCatSpec, {cat: {name: 'Cibi'}, firstName: 'Léa'}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{cat: {name: 'Cibi'}, firstName: 'Léa'} / PersonCatSpec / {cat: {name: 'Cibi'}, firstName: 'Léa'}`, PersonCatSpec, {cat: {name: 'Cibi', otherProperty: 'a'}, firstName: 'Léa', age: 20}, {expectedValue: {cat: {name: 'Cibi'}, firstName: 'Léa', age: 20}}));
testMappers.push(new TestMapper(`{cat: undefined, firstName: 'Léa'} / PersonCatSpec`, PersonCatSpec, {cat: undefined, firstName: 'Léa'}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`{} / PersonCatSpec / new PersonCatSpec()`, PersonCatSpec, {}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`'a' / PersonCatSpec / new PersonCatSpec()`, PersonCatSpec, 'a', {expectedValue: undefined}));
testMappers.push(new TestMapper(`{cat: new CatSpec(), firstName: 'Léa', age: 20} / PersonCatSpec`, PersonCatSpec, {cat: new CatSpec(), firstName: 'Léa', age: 20}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`[new CatSpec()] / PersonCatSpec / [new CatSpec()]`, PersonCatSpec, [new CatSpec()], {expectedValue: undefined}));
testMappers.push(new TestMapper(`[new PersonCatSpec()] / PersonCatSpec / [new PersonCatSpec()]`, PersonCatSpec, [new PersonCatSpec()], {expectedValue: undefined}));


// --------------------------------------------   Cast string and numbers   -----------------------------------------------

export class CastSpec {
    age: number;
    firstName: string;
}
const personWithCorrectTypes = new CastSpec();
personWithCorrectTypes.age = 49;
personWithCorrectTypes.firstName = 'Léo';

testMappers.push(new TestMapper(`personWithCorrectTypes / CastSpec`, CastSpec, personWithCorrectTypes, {isolate: false}));
testMappers.push(new TestMapper(`{age: 49, firstName: 'Léo'} / CastSpec`, CastSpec, {age: 49, firstName: 'Léo'}));


// --------------------------------------------------   External Module   -------------------------------------------------


testMappers.push(new TestMapper(`{color: 'White'} / Chalk / undefined`, 'Chalk', {color: 'White'}, {expectedValue: undefined, shouldFail: true, isolate: false}));


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

// TODO: heritage
// testMappers.push(new TestMapper(`{color: 'Blue', name: 'Léa'} / ChildClassSpec`, ChildClassSpec, {color: 'Blue', name: 'Léa'}, {isolate: true}));
testMappers.push(new TestMapper(`{color: 'White'} / ChildClassSpec / {color: 'White', name: 'unknown'}`, ChildClassSpec, {color: 'White'}, {expectedValue: {color: 'White', name: 'unknown'}, isolate: false}));
testMappers.push(new TestMapper(`{} / ChildClassSpec / {color: undefined, name: 'unknown'}`, ChildClassSpec, {}, {expectedValue: undefined, isolate: false}));


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
testMappers.push(new TestMapper(`{} / ChildAbstractClassSpec / undefined`, ChildAbstractClassSpec, {}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`{name: 'Léa'} / AbstractParentClassSpec / undefined`, 'AbstractParentClassSpec', {name: 'Léa'}, {expectedValue: undefined}));
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
testMappers.push(new TestMapper(`{age: [2]} / StringOrNumberClassSpec`, StringOrNumberClassSpec, {age: [2]}, {expectedValue: undefined, isolate: false}));


// ----------------------------------------------   Null or Literal   ------------------------------------------------------


export class NullSpec {
    prop: null;
}
testMappers.push(new TestMapper(`{prop: 1} / NullSpec / {prop: null}`, NullSpec, {prop: 1}, {expectedValue: {prop: null}, isolate: false}));


export class UndefinedSpec {
    prop: undefined;
}
testMappers.push(new TestMapper(`{prop: 1} / UndefinedSpec / {prop: 1}`, UndefinedSpec, {prop: 1}, {expectedValue: {prop: undefined}, isolate: false}));


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


// ----------------------------------------------------   Object   ------------------------------------------------------


export class PropertyObjectSpec {
    prop: object;
}
testMappers.push(new TestMapper(`{prop: {name: 'a'}} / PropertyObjectSpec`, PropertyObjectSpec, {prop: {name: 'a'}}, {isolate: false}));
testMappers.push(new TestMapper(`{prop: ['a']} / PropertyObjectSpec`, PropertyObjectSpec, {prop: ['a']}, {isolate: false}));
testMappers.push(new TestMapper(`{prop: 'a'} / PropertyObjectSpec / {prop: undefined}`, PropertyObjectSpec, {prop: 'a'}, {expectedValue: undefined, isolate: false}));



// ----------------------------------   Property typed with type: string[] or string ---------------------------------------


export type StringsOrStringSpec = string[] | string;
export class PaintStringsOrStringSpec {
    colors: StringsOrStringSpec;
}

testMappers.push(new TestMapper(`{colors: 'Blue'} / PaintStringsOrStringSpec`, PaintStringsOrStringSpec, {colors: 'Blue'}));
testMappers.push(new TestMapper(`{colors: 'Blue', unknownProperty: 'Blue'} / PaintStringsOrStringSpec / {}`, PaintStringsOrStringSpec, {colors: 'Blue', unknownProperty: 'Blue'}, {expectedValue: {colors: 'Blue'}, isolate: false}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / PaintStringsOrStringSpec / undefined`, PaintStringsOrStringSpec, {unknownProperty: 'Blue'}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{colors: ['Blue', 'White']} / PaintStringsOrStringSpec`, PaintStringsOrStringSpec, {colors: ['Blue', 'White']}));


// ----------------------------   Class with property typed with type: string or string[] ---------------------------------


export type StringOrStringsSpec = string | string[];
export class PaintStringOrStringsSpec {
    colors: StringOrStringsSpec;
}

// testMappers.push(new TestMapper(`{colors: 'Blue'} / PaintStringOrStringsSpec`, PaintStringOrStringsSpec, {colors: 'Blue'}, {isolate: true})); // TODO
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / PaintStringOrStringsSpec / {}`, PaintStringOrStringsSpec, {unknownProperty: 'Blue'}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`{colors: ['Blue', 'White']} / PaintStringOrStringsSpec`, PaintStringOrStringsSpec, {colors: ['Blue', 'White']}));


// ---------------------------------   Property typed with type: number[] or number ---------------------------------------


export type NumbersOrNumberSpec = number[] | number;
export class AgeNumbersOrNumberSpec {
    ages: NumbersOrNumberSpec;
}

testMappers.push(new TestMapper(`{ages: 2} / AgeNumbersOrNumberSpec`, AgeNumbersOrNumberSpec, {ages: 2}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / AgeNumbersOrNumberSpec / {}`, AgeNumbersOrNumberSpec, {unknownProperty: 'Blue'}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`{ages: [4, 6]} / AgeNumbersOrNumberSpec`, AgeNumbersOrNumberSpec, {ages: [4, 6]}));


// ----------------------------   Class with property typed with type: number or number[] ---------------------------------


export type NumberOrNumbersSpec = number | number[];
export class AgeNumberOrNumbersSpec {
    ages: NumberOrNumbersSpec;
}

testMappers.push(new TestMapper(`{ages: 2} / AgeNumberOrNumbersSpec`, AgeNumberOrNumbersSpec, {ages: 2}, {isolate: false}));
testMappers.push(new TestMapper(`{unknownProperty: 'Blue'} / AgeNumberOrNumbersSpec / {}`, AgeNumberOrNumbersSpec, {unknownProperty: 'Blue'}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`{ages: [4, 6]} / AgeNumberOrNumbersSpec`, AgeNumberOrNumbersSpec, {ages: [4, 6]}));
testMappers.push(new TestMapper(`{ages: ['a', 6]} / AgeNumberOrNumbersSpec / {ages: [undefined, 6]}`, AgeNumberOrNumbersSpec, {ages: ['a', 6]}, {expectedValue: {ages: [undefined, 6]}}));


// -----------------------------   Class with property typed with type literal 1 | 2 | 3   --------------------------------


export type LevelSpec = 1 | 2 | 3;
export class LevelClassSpec {
    level: LevelSpec
}

testMappers.push(new TestMapper(`{level: 1} / LevelClassSpec`, LevelClassSpec, {level: 1}, {isolate: false}));
testMappers.push(new TestMapper(`{level: 1} / LevelClassSpec`, LevelClassSpec, {level: 1}, {isolate: false}));


// --------------------------------------   Property with Type which is Union Type   --------------------------------------


export class NameSpec {
    name: string;
}
const nameSpec = new NameSpec();
nameSpec.name = 'Biela';

export type UnionTypeClassAndStringSpec = CatSpec | string;
export class ClassWithUnionTypeSpec {
    union: UnionTypeClassAndStringSpec;
}

testMappers.push(new TestMapper(`{union: undefined} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, {union: undefined}));
testMappers.push(new TestMapper(`{union: 'a'} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, {union: 'a'}));
testMappers.push(new TestMapper(`new ClassWithUnionTypeSpec() / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, new ClassWithUnionTypeSpec(), {expectedValue: undefined}));
testMappers.push(new TestMapper(`{union: new NameSpec()} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, {union: new NameSpec()}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`{union: nameSpec} / ClassWithUnionTypeSpec`, ClassWithUnionTypeSpec, {union: nameSpec}));


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

// TODO: implement behavior if mapped is defined but could be defined too in the other parts of the union type
// testMappers.push(new TestMapper(`{employer: { name: 'Total', employees: 30000}} / PersonSpec`, PersonSpec,{employer: { name: 'Total', employees: 30000}}, {isolate: true}));
// testMappers.push(new TestMapper(`{employer: [{ name: 'Total', employees: 30000}]} / PersonSpec`, PersonSpec,{employer: [{ name: 'Total', employees: 30000}]}, {expectedValue: {employer: undefined}}));
testMappers.push(new TestMapper(`{employer: { name: 'Greenpeace', volunteers: 3000}} / PersonSpec`, PersonSpec,{employer: [{ name: 'Greenpeace', volunteers: 3000}]}));


// ------------------------------------------------------------------------------------------------------------------------
// --------------------------------------   Classes with property having Type Literal   -----------------------------------
// ------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------   Property with Type Literal string   ---------------------------------------


export class ObjectLiteralStringSpec {
    obj: {str: string};
}
testMappers.push(new TestMapper(`{obj: {str: 'a'}} / ObjectLiteralStringSpec`, ObjectLiteralStringSpec, {obj: {str: 'a'}}, {isolate: false}));
testMappers.push(new TestMapper(`{obj: 2} / ObjectLiteralStringSpec / undefined`, ObjectLiteralStringSpec, {obj: 2}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{obj: {}} / ObjectLiteralStringSpec / undefined`, ObjectLiteralStringSpec, {obj: {}}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{obj: {str: 2}} / ObjectLiteralStringSpec / undefined`, ObjectLiteralStringSpec, {obj: {str: 2}}, {expectedValue: undefined, isolate: false}));
testMappers.push(new TestMapper(`{obj: {irrelevant: 'a'}} / ObjectLiteralStringSpec / undefined`, ObjectLiteralStringSpec, {obj: {irrelevant: 'a'}}, {expectedValue: undefined, isolate: false}));


// --------------------------------------   Property with Type Literal with wrong chars   ---------------------------------


export class ObjectLiteralWrongCharsSpec {
    obj?: {
        name?:    string,
        place?: {
            city?:  string,
        }
    }
}
testMappers.push(new TestMapper(`{obj: {name: 'a'}} / ObjectLiteralWrongCharsSpec`, ObjectLiteralWrongCharsSpec, {obj: {name: 'a'}}, {isolate: false}));
testMappers.push(new TestMapper(`{obj: {    name: 'a'}} / ObjectLiteralWrongCharsSpec`, ObjectLiteralWrongCharsSpec, {obj: {    name: 'a'}}, {isolate: false}));


// ------------------------------------   Property with Type Literal with Indexable type   --------------------------------


export class ObjectLiteraIndexableSpec {
    obj?: {
        [key: string]: string
    }
}
testMappers.push(new TestMapper(`{obj: {name: 'a'}} / ObjectLiteraIndexableSpec`, ObjectLiteraIndexableSpec, {obj: {name: 'a'}}, {isolate: false}));
testMappers.push(new TestMapper(`{obj: 'a'} / ObjectLiteraIndexableSpec / undefined`, ObjectLiteraIndexableSpec, {obj: 'a'}, {expectedValue: undefined, isolate: false}));


// ---------------------------------------   Property with Type Literal string number   -----------------------------------


export class ObjectLiteralStringNumberSpec {
    prop: {str: string, nb: number};
}
testMappers.push(new TestMapper(`{prop: {str: 'a', nb: 2} / ObjectLiteralStringNumberSpec`, ObjectLiteralStringNumberSpec, {prop: {str: 'a', nb: 2}}, {isolate: false}));


// ------------------------------------------   Property with array of Type Literal   -------------------------------------


export class ObjectLiteralStringArraySpec {
    prop: {str: string}[];
}
testMappers.push(new TestMapper(`{prop: [{str: 'a'}, {str: 'b'}] / ObjectLiteralStringArraySpec`, ObjectLiteralStringArraySpec, {prop: [{str: 'a'}, {str: 'b'}]}, {isolate: false}));
testMappers.push(new TestMapper(`{prop: {str: 'a'} / ObjectLiteralStringArraySpec`, ObjectLiteralStringArraySpec, {prop: {str: 'a'}}, {expectedValue: undefined, isolate: false}));


// ------------------------------------   Property with Type Literal in Indexable type   --------------------------------


// TODO: Literal types in indexable types
export class ObjectLiteraIndexableTLLSpec {
    [key: string]: {name: string}
}
// testMappers.push(new TestMapper(`{obj: {name: 'a'}} / ObjectLiteraIndexableTLLSpec`, ObjectLiteraIndexableTLLSpec, {obj: {name: 'a'}}, {isolate: true}));


// TODO: Literals nested 2 times ?
