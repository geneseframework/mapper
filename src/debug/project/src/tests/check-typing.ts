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
async function checkTyping() {


    // ---------------------------------------------   Strings   -----------------------------------------------------

    const fooString: string = await create('string', 'a');
    const fooStringValueAny: string = await create('string', valueAny);
    const fooStringValueUnknown: string = await create('string', valueUnknown);
    const fooStringNumber: unknown = await create('string', 2);
    const fooStringObject: unknown = await create('string', {});

    const fooStringConstructor: string = await create(String, 'a');
    const fooStringConstructorNumber: unknown = await create(String, 2);
    const fooStringConstructorValueAny: string = await create(String, valueAny);
    const fooStringConstructorValueUnknown: string = await create(String, valueUnknown);

    const fooStringConstructorArrayStringArray: string[] = await create([String], ['a', 'b']);
    const fooStringConstructorArrayString: unknown = await create([String], 'a');
    const fooStringConstructorArrayNumber: unknown = await create([String], 2);
    const fooStringConstructorArrayNumberArray: string[] = await create([String], [2, 3]);
    const fooStringConstructorArrayValueAny: string[] = await create([String], valueAny);
    const fooStringConstructorArrayValueUnknown: string[] = await create([String], valueUnknown);

    const fooStringArray: string[] = await create('string[]', ['a', 'b']);
    const fooStringArrayDifferentTypes: string[] = await create('string[]', ['a', 2]);
    const fooStringArrayString: unknown = await create('string[]', 'a');
    const fooStringArrayObject: unknown = await create('string[]', {a: 3});

    // --------------------------------------------------   Numbers   -----------------------------------------------------

    const fooNumber: number = await create('number', 3);
    const fooNumberNumber: unknown = await create('number', 'a');
    const fooNumberObject: unknown = await create('number', {});

    const fooNumberType: number = await create(Number, 3);
    const fooNumberTypeNumber: unknown = await create(Number, 'a');

    const fooNumberConstructorType: number[] = await create([Number], [3, 4]);
    const fooNumberConstructorTypeNumber: unknown = await create([Number], 'a');

    const fooNumberArray: number[] = await create('number[]', [3, 4]);
    const fooNumberArrayDifferentTypes: number[] = await create('number[]', ['a', 4]);
    const fooNumberArrayWrong: unknown = await create('number[]', 3);

    // -------------------------------------------------   Booleans   -----------------------------------------------------

    const fooBoolean: boolean = await create('boolean', false);
    const fooBooleanBoolean: unknown = await create('boolean', 'a');
    const fooBooleanObject: unknown = await create('boolean', {});

    const fooBooleanType: boolean = await create(Boolean, false);
    const fooBooleanTypeBoolean: unknown = await create(Boolean, 'a');

    const fooBooleanConstructorType: boolean[] = await create([Boolean], [false, true]);
    const fooBooleanConstructorTypeBoolean: unknown = await create([Boolean], 'a');

    const fooBooleanArray: boolean[] = await create('boolean[]', [false, true]);
    const fooBooleanArrayDifferentTypes: boolean[] = await create('boolean[]', ['a', true]);
    const fooBooleanArrayWrong: unknown = await create('boolean[]', false);

    // -------------------------------------------   Objects (not arrays)   -----------------------------------------------

    const fooObject: object = await create('object', {a: 2});
    const fooObjectString: unknown = await create('object', 'a');
    const fooObjectNumber: unknown = await create('object', 2);
    const fooObjectArray: unknown = await create('object', [2]);

    const fooObjectConstructorObject: object = await create(Object, {a: 2});
    const fooObjectConstructorBoolean: unknown = await create(Object, false);
    const fooObjectConstructorString: unknown = await create(Object, 'a');

    const fooObjectConstructorArrayBooleans: object[] = await create([Object], [false, true]);
    const fooObjectConstructorTypeObject: unknown = await create([Object], 'a');

    const fooObjectArrayBooleans: object[] = await create('object[]', [false, true]);
    const fooObjectArrayDifferentTypes: object[] = await create('object[]', ['a', true]);
    const fooObjectArrayWrong: unknown = await create('object[]', false);

    // ---------------------------------------------   Dates   -----------------------------------------------------

    const fooDate: Date = await create(Date, 1614094099126);
    const fooDateDate: Date = await create(Date, 'Tue Feb 23 2021');
    const fooDateType: Date = await create(Date, 'a');
    const fooDateTypeDate: unknown = await create(Date, false);
    const fooDateObject: unknown = await create(Date, {});

    const fooDateArray: Date[] = await create([Date], [1614094099126, 1614094099127]);
    const fooDateDateArray: Date[] = await create([Date], ['Tue Feb 23 2021', 'Tue Feb 24 2021']);
    const fooDateTypeArray: Date[] = await create([Date], ['a', 'b']);
    const fooDateTypeDateArray: unknown = await create([Date], false);
    const fooDateObjectArray: unknown = await create([Date], {});

    // -----------------------------------------------   Class   -----------------------------------------------------

    const fooClassObject: FooClass = await create(FooClass, {});
    const fooClassObjectWithProperty: FooClass = await create(FooClass, {property: 'a'});
    const fooClassString: unknown = await create(FooClass, 'a');
    const fooClassNumber: unknown = await create(FooClass, 2);
    const fooClassBoolean: unknown = await create(FooClass, true);
    const fooClassArray: unknown = await create(FooClass, [{}]);

    // ----------------------------------------------   Class[]   ----------------------------------------------------

    const fooClassArrayOfFooClass: FooClass[] = await create([FooClass], [new FooClass()]);
    const fooClassArrayOfObjects: FooClass[] = await create([FooClass], [{}]);
    const fooClassArrayOfString: FooClass[] = await create([FooClass], ['a']);
    const fooClassArrayOfBooleans: FooClass[] = await create([FooClass], [true]);
    const fooClassArrayOfNumbers: FooClass[] = await create([FooClass], [2]);
    const fooClassArrayTupleWithObjectNotArrayData: unknown = await create([FooClass, FooClass], {});
    const fooClassArrayTupleWithBooleanData: unknown = await create([FooClass, FooClass], true);
    const fooClassArrayTupleWithStringData: unknown = await create([FooClass, FooClass], 'a');
    const fooClassArrayTupleWithNumberData: unknown = await create([FooClass, FooClass], 2);
    const fooClassArrayTupleWithTData: unknown = await create([FooClass, FooClass], new FooClass());

}

checkTyping()
