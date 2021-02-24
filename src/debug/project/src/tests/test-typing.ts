// -------------------------------------------------------------------------------------------------
// ---------------------------------------   Check returned types   --------------------------------
// -------------------------------------------------------------------------------------------------


import { Create } from '../../../../models/create';

let valueAny: any;
let valueUnknown: unknown;

export class FooClass {
    foo: string;
}

class BarClass {
    bar: string;
}

/**
 * The compilation should crash if one of the result values has wrong type
 */
async function testTyping() {


    // ---------------------------------------------   Strings   -----------------------------------------------------

    const fooString: string = await Create.create('string', 'a');
    const fooStringValueAny: string = await Create.create('string', valueAny);
    const fooStringValueUnknown: string = await Create.create('string', valueUnknown);
    const fooStringNumber: unknown = await Create.create('string', 2);
    const fooStringObject: unknown = await Create.create('string', {});

    const fooStringConstructor: string = await Create.create(String, 'a');
    const fooStringConstructorNumber: unknown = await Create.create(String, 2);
    const fooStringConstructorValueAny: string = await Create.create(String, valueAny);
    const fooStringConstructorValueUnknown: string = await Create.create(String, valueUnknown);

    const fooStringConstructorArrayStringArray: string[] = await Create.create([String], ['a', 'b']);
    const fooStringConstructorArrayString: unknown = await Create.create([String], 'a');
    const fooStringConstructorArrayNumber: unknown = await Create.create([String], 2);
    const fooStringConstructorArrayNumberArray: string[] = await Create.create([String], [2, 3]);
    const fooStringConstructorArrayValueAny: string[] = await Create.create([String], valueAny);
    const fooStringConstructorArrayValueUnknown: string[] = await Create.create([String], valueUnknown);

    const fooStringArray: string[] = await Create.create('string[]', ['a', 'b']);
    const fooStringArrayDifferentTypes: string[] = await Create.create('string[]', ['a', 2]);
    const fooStringArrayString: unknown = await Create.create('string[]', 'a');
    const fooStringArrayObject: unknown = await Create.create('string[]', {a: 3});

    // --------------------------------------------------   Numbers   -----------------------------------------------------

    const fooNumber: number = await Create.create('number', 3);
    const fooNumberNumber: unknown = await Create.create('number', 'a');
    const fooNumberObject: unknown = await Create.create('number', {});

    const fooNumberType: number = await Create.create(Number, 3);
    const fooNumberTypeNumber: unknown = await Create.create(Number, 'a');

    const fooNumberConstructorType: number[] = await Create.create([Number], [3, 4]);
    const fooNumberConstructorTypeNumber: unknown = await Create.create([Number], 'a');

    const fooNumberArray: number[] = await Create.create('number[]', [3, 4]);
    const fooNumberArrayDifferentTypes: number[] = await Create.create('number[]', ['a', 4]);
    const fooNumberArrayWrong: unknown = await Create.create('number[]', 3);

    // -------------------------------------------------   Booleans   -----------------------------------------------------

    const fooBoolean: boolean = await Create.create('boolean', false);
    const fooBooleanBoolean: unknown = await Create.create('boolean', 'a');
    const fooBooleanObject: unknown = await Create.create('boolean', {});

    const fooBooleanType: boolean = await Create.create(Boolean, false);
    const fooBooleanTypeBoolean: unknown = await Create.create(Boolean, 'a');

    const fooBooleanConstructorType: boolean[] = await Create.create([Boolean], [false, true]);
    const fooBooleanConstructorTypeBoolean: unknown = await Create.create([Boolean], 'a');

    const fooBooleanArray: boolean[] = await Create.create('boolean[]', [false, true]);
    const fooBooleanArrayDifferentTypes: boolean[] = await Create.create('boolean[]', ['a', true]);
    const fooBooleanArrayWrong: unknown = await Create.create('boolean[]', false);

    // -------------------------------------------   Objects (not arrays)   -----------------------------------------------

    const fooObject: object = await Create.create('object', {a: 2});
    const fooObjectString: unknown = await Create.create('object', 'a');
    const fooObjectNumber: unknown = await Create.create('object', 2);
    const fooObjectArray: unknown = await Create.create('object', [2]);

    const fooObjectConstructorObject: object = await Create.create('object', {a: 2});
    const fooObjectConstructorBoolean: unknown = await Create.create(Object, false);
    const fooObjectConstructorString: unknown = await Create.create(Object, 'a');

    const fooObjectConstructorArrayBooleans: object[] = await Create.create([Object], [false, true]);
    const fooObjectConstructorTypeObject: unknown = await Create.create([Object], 'a');

    const fooObjectArrayBooleans: object[] = await Create.create('object[]', [false, true]);
    const fooObjectArrayDifferentTypes: object[] = await Create.create('object[]', ['a', true]);
    const fooObjectArrayWrong: unknown = await Create.create('object[]', false);

    // ---------------------------------------------   Dates   -----------------------------------------------------

    const fooDate: Date = await Create.create(Date, 1614094099126);
    const fooDateDate: Date = await Create.create(Date, 'Tue Feb 23 2021');
    const fooDateType: Date = await Create.create(Date, 'a');
    const fooDateTypeDate: unknown = await Create.create(Date, false);
    const fooDateObject: unknown = await Create.create(Date, {});

    const fooDateArray: Date[] = await Create.create([Date], [1614094099126, 1614094099127]);
    const fooDateDateArray: Date[] = await Create.create([Date], ['Tue Feb 23 2021', 'Tue Feb 24 2021']);
    const fooDateTypeArray: Date[] = await Create.create([Date], ['a', 'b']);
    const fooDateTypeDateArray: unknown = await Create.create([Date], false);
    const fooDateObjectArray: unknown = await Create.create([Date], {});

    // -----------------------------------------------   Class   -----------------------------------------------------

    const fooClassObject: FooClass = await Create.create(FooClass, {});
    const fooClassObjectWithProperty: FooClass = await Create.create(FooClass, {property: 'a'});
    const fooClassString: unknown = await Create.create(FooClass, 'a');
    const fooClassNumber: unknown = await Create.create(FooClass, 2);
    const fooClassBoolean: unknown = await Create.create(FooClass, true);
    const fooClassArray: unknown = await Create.create(FooClass, [{}]);

    // ----------------------------------------------   Class[]   ----------------------------------------------------

    const fooClassArrayOfFooClass: FooClass[] = await Create.create([FooClass], [new FooClass()]);
    const fooClassArrayOfObjects: FooClass[] = await Create.create([FooClass], [{}]);
    const fooClassArrayOfString: FooClass[] = await Create.create([FooClass], ['a']);
    const fooClassArrayOfBooleans: FooClass[] = await Create.create([FooClass], [true]);
    const fooClassArrayOfNumbers: FooClass[] = await Create.create([FooClass], [2]);
    const fooClassArrayTupleWithObjectNotArrayData: unknown = await Create.create([FooClass, FooClass], {});
    const fooClassArrayTupleWithBooleanData: unknown = await Create.create([FooClass, FooClass], true);
    const fooClassArrayTupleWithStringData: unknown = await Create.create([FooClass, FooClass], 'a');
    const fooClassArrayTupleWithNumberData: unknown = await Create.create([FooClass, FooClass], 2);
    const fooClassArrayTupleWithTData: unknown = await Create.create([FooClass, FooClass], new FooClass());

}

testTyping()
