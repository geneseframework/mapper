// -------------------------------------------------------------------------------------------------
// ---------------------------------------   Check returned types   --------------------------------
// -------------------------------------------------------------------------------------------------


import { create } from '../../../../create/main';

let valueAny: any;
let valueUnknown: unknown;

export class FooClass {
    foo: string;
}

class BarClass {
    bar: string;
}

/**
 * The compilation should crash if one of the result initializers has wrong type
 */
// function checkTyping() {


    // ---------------------------------------------   Strings   -----------------------------------------------------

    const fooString: string = create('string', 'a');
    const fooStringValueAny: string = create('string', valueAny);
    const fooStringValueUnknown: string = create('string', valueUnknown);
    const fooStringNumber: unknown = create('string', 2);
    const fooStringObject: unknown = create('string', {});

    const fooStringConstructor: string = create(String, 'a');
    const fooStringConstructorNumber: unknown = create(String, 2);
    const fooStringConstructorValueAny: string = create(String, valueAny);
    const fooStringConstructorValueUnknown: string = create(String, valueUnknown);

    const fooStringConstructorArrayStringArray: string[] = create([String], ['a', 'b']);
    const fooStringConstructorArrayString: unknown = create([String], 'a');
    const fooStringConstructorArrayNumber: unknown = create([String], 2);
    const fooStringConstructorArrayNumberArray: string[] = create([String], [2, 3]);
    const fooStringConstructorArrayValueAny: string[] = create([String], valueAny);
    const fooStringConstructorArrayValueUnknown: string[] = create([String], valueUnknown);

    const fooStringArray: string[] = create('string[]', ['a', 'b']);
    const fooStringArrayDifferentTypes: string[] = create('string[]', ['a', 2]);
    const fooStringArrayString: unknown = create('string[]', 'a');
    const fooStringArrayObject: unknown = create('string[]', {a: 3});

    // --------------------------------------------------   Numbers   -----------------------------------------------------

    const fooNumber: number = create('number', 3);
    const fooNumberNumber: unknown = create('number', 'a');
    const fooNumberObject: unknown = create('number', {});

    const fooNumberType: number = create(Number, 3);
    const fooNumberTypeNumber: unknown = create(Number, 'a');

    const fooNumberConstructorType: number[] = create([Number], [3, 4]);
    const fooNumberConstructorTypeNumber: unknown = create([Number], 'a');

    const fooNumberArray: number[] = create('number[]', [3, 4]);
    const fooNumberArrayDifferentTypes: number[] = create('number[]', ['a', 4]);
    const fooNumberArrayWrong: unknown = create('number[]', 3);

    // -------------------------------------------------   Booleans   -----------------------------------------------------

    const fooBoolean: boolean = create('boolean', false);
    const fooBooleanBoolean: unknown = create('boolean', 'a');
    const fooBooleanObject: unknown = create('boolean', {});

    const fooBooleanType: boolean = create(Boolean, false);
    const fooBooleanTypeBoolean: unknown = create(Boolean, 'a');

    const fooBooleanConstructorType: boolean[] = create([Boolean], [false, true]);
    const fooBooleanConstructorTypeBoolean: unknown = create([Boolean], 'a');

    const fooBooleanArray: boolean[] = create('boolean[]', [false, true]);
    const fooBooleanArrayDifferentTypes: boolean[] = create('boolean[]', ['a', true]);
    const fooBooleanArrayWrong: unknown = create('boolean[]', false);

    // -------------------------------------------   Objects (not arrays)   -----------------------------------------------

    const fooObject: object = create('object', {a: 2});
    const fooObjectString: unknown = create('object', 'a');
    const fooObjectNumber: unknown = create('object', 2);
    const fooObjectArray: unknown = create('object', [2]);

    const fooObjectConstructorObject: object = create(Object, {a: 2});
    const fooObjectConstructorBoolean: unknown = create(Object, false);
    const fooObjectConstructorString: unknown = create(Object, 'a');

    const fooObjectConstructorArrayBooleans: object[] = create([Object], [false, true]);
    const fooObjectConstructorTypeObject: unknown = create([Object], 'a');

    const fooObjectArrayBooleans: object[] = create('object[]', [false, true]);
    const fooObjectArrayDifferentTypes: object[] = create('object[]', ['a', true]);
    const fooObjectArrayWrong: unknown = create('object[]', false);

    // ---------------------------------------------   Dates   -----------------------------------------------------

    const fooDate: number = create('Date', 1614094099126);
    const barDate: number = create(Date, 1614094099126);
    const fooDateDate: Date = create(Date, 'Tue Feb 23 2021');
    const fooDateType: Date = create(Date, 'a');
    const fooDateTypeDate: unknown = create(Date, false);
    const fooDateObject: unknown = create(Date, {});

    const fooDateArray: Date[] = create([Date], [1614094099126, 1614094099127]);
    const fooDateDateArray: Date[] = create([Date], ['Tue Feb 23 2021', 'Tue Feb 24 2021']);
    const fooDateTypeArray: Date[] = create([Date], ['a', 'b']);
    const fooDateTypeDateArray: unknown = create([Date], false);
    const fooDateObjectArray: unknown = create([Date], {});

    // -----------------------------------------------   Class   -----------------------------------------------------

    const fooClassObject: FooClass = create(FooClass, {});
    const fooClassObjectWithProperty: FooClass = create(FooClass, {property: 'a'});
    const fooClassString: unknown = create(FooClass, 'a');
    const fooClassNumber: unknown = create(FooClass, 2);
    const fooClassBoolean: unknown = create(FooClass, true);
    const fooClassArray: unknown = create(FooClass, [{}]);

    // ----------------------------------------------   Class[]   ----------------------------------------------------

    const fooClassArrayOfFooClass: FooClass[] = create([FooClass], [new FooClass()]);
    const fooClassArrayOfObjects: FooClass[] = create([FooClass], [{}]);
    const fooClassArrayOfString: FooClass[] = create([FooClass], ['a']);
    const fooClassArrayOfBooleans: FooClass[] = create([FooClass], [true]);
    const fooClassArrayOfNumbers: FooClass[] = create([FooClass], [2]);
    const fooClassArrayTupleWithObjectNotArrayData: unknown = create([FooClass, FooClass], {});
    const fooClassArrayTupleWithBooleanData: unknown = create([FooClass, FooClass], true);
    const fooClassArrayTupleWithStringData: unknown = create([FooClass, FooClass], 'a');
    const fooClassArrayTupleWithNumberData: unknown = create([FooClass, FooClass], 2);
    const fooClassArrayTupleWithTData: unknown = create([FooClass, FooClass], new FooClass());

// }

// checkTyping()
