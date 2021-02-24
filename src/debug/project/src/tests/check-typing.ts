// -------------------------------------------------------------------------------------------------
// ---------------------------------------   Check returned types   --------------------------------
// -------------------------------------------------------------------------------------------------


import { Mapper } from '../../../../models/mapper';
import * as chalk from 'chalk';

let valueAny: any;
let valueUnknown: unknown;

class FooClass {
    foo: string;
}

class BarClass {
    bar: string;
}

/**
 * The compilation should crash if one of the result values has wrong type
 */
async function checkTyping() {


    // ---------------------------------------------   Strings   -----------------------------------------------------

    const fooString: string = await Mapper.create('string', 'a');
    const fooStringValueAny: string = await Mapper.create('string', valueAny);
    const fooStringValueUnknown: string = await Mapper.create('string', valueUnknown);
    const fooStringNumber: unknown = await Mapper.create('string', 2);
    const fooStringObject: unknown = await Mapper.create('string', {});

    const fooStringConstructor: string = await Mapper.create(String, 'a');
    const fooStringConstructorNumber: unknown = await Mapper.create(String, 2);
    const fooStringConstructorValueAny: string = await Mapper.create(String, valueAny);
    const fooStringConstructorValueUnknown: string = await Mapper.create(String, valueUnknown);

    const fooStringConstructorArrayStringArray: string[] = await Mapper.create([String], ['a', 'b']);
    const fooStringConstructorArrayString: unknown = await Mapper.create([String], 'a');
    const fooStringConstructorArrayNumber: unknown = await Mapper.create([String], 2);
    const fooStringConstructorArrayNumberArray: string[] = await Mapper.create([String], [2, 3]);
    const fooStringConstructorArrayValueAny: string[] = await Mapper.create([String], valueAny);
    const fooStringConstructorArrayValueUnknown: string[] = await Mapper.create([String], valueUnknown);

    const fooStringArray: string[] = await Mapper.create('string[]', ['a', 'b']);
    const fooStringArrayDifferentTypes: string[] = await Mapper.create('string[]', ['a', 2]);
    const fooStringArrayString: unknown = await Mapper.create('string[]', 'a');
    const fooStringArrayObject: unknown = await Mapper.create('string[]', {a: 3});

    // --------------------------------------------------   Numbers   -----------------------------------------------------

    const fooNumber: number = await Mapper.create('number', 3);
    const fooNumberNumber: unknown = await Mapper.create('number', 'a');
    const fooNumberObject: unknown = await Mapper.create('number', {});

    const fooNumberType: number = await Mapper.create(Number, 3);
    const fooNumberTypeNumber: unknown = await Mapper.create(Number, 'a');

    const fooNumberConstructorType: number[] = await Mapper.create([Number], [3, 4]);
    const fooNumberConstructorTypeNumber: unknown = await Mapper.create([Number], 'a');

    const fooNumberArray: number[] = await Mapper.create('number[]', [3, 4]);
    const fooNumberArrayDifferentTypes: number[] = await Mapper.create('number[]', ['a', 4]);
    const fooNumberArrayWrong: unknown = await Mapper.create('number[]', 3);

    // -------------------------------------------------   Booleans   -----------------------------------------------------

    const fooBoolean: boolean = await Mapper.create('boolean', false);
    const fooBooleanBoolean: unknown = await Mapper.create('boolean', 'a');
    const fooBooleanObject: unknown = await Mapper.create('boolean', {});

    const fooBooleanType: boolean = await Mapper.create(Boolean, false);
    const fooBooleanTypeBoolean: unknown = await Mapper.create(Boolean, 'a');

    const fooBooleanConstructorType: boolean[] = await Mapper.create([Boolean], [false, true]);
    const fooBooleanConstructorTypeBoolean: unknown = await Mapper.create([Boolean], 'a');

    const fooBooleanArray: boolean[] = await Mapper.create('boolean[]', [false, true]);
    const fooBooleanArrayDifferentTypes: boolean[] = await Mapper.create('boolean[]', ['a', true]);
    const fooBooleanArrayWrong: unknown = await Mapper.create('boolean[]', false);

    // -------------------------------------------   Objects (not arrays)   -----------------------------------------------

    const fooObject: object = await Mapper.create('object', {a: 2});
    const fooObjectString: unknown = await Mapper.create('object', 'a');
    const fooObjectNumber: unknown = await Mapper.create('object', 2);
    const fooObjectArray: unknown = await Mapper.create('object', [2]);

    const fooObjectConstructorObject: object = await Mapper.create('object', {a: 2});
    const fooObjectConstructorBoolean: unknown = await Mapper.create(Object, false);
    const fooObjectConstructorString: unknown = await Mapper.create(Object, 'a');

    const fooObjectConstructorArrayBooleans: object[] = await Mapper.create([Object], [false, true]);
    const fooObjectConstructorTypeObject: unknown = await Mapper.create([Object], 'a');

    const fooObjectArrayBooleans: object[] = await Mapper.create('object[]', [false, true]);
    const fooObjectArrayDifferentTypes: object[] = await Mapper.create('object[]', ['a', true]);
    const fooObjectArrayWrong: unknown = await Mapper.create('object[]', false);

    // ---------------------------------------------   Dates   -----------------------------------------------------

    const fooDate: Date = await Mapper.create(Date, 1614094099126);
    const fooDateDate: Date = await Mapper.create(Date, 'Tue Feb 23 2021');
    const fooDateType: Date = await Mapper.create(Date, 'a');
    const fooDateTypeDate: unknown = await Mapper.create(Date, false);
    const fooDateObject: unknown = await Mapper.create(Date, {});

    const fooDateArray: Date[] = await Mapper.create([Date], [1614094099126, 1614094099127]);
    const fooDateDateArray: Date[] = await Mapper.create([Date], ['Tue Feb 23 2021', 'Tue Feb 24 2021']);
    const fooDateTypeArray: Date[] = await Mapper.create([Date], ['a', 'b']);
    const fooDateTypeDateArray: unknown = await Mapper.create([Date], false);
    const fooDateObjectArray: unknown = await Mapper.create([Date], {});

    // -----------------------------------------------   Class   -----------------------------------------------------

    const fooClassObject: FooClass = await Mapper.create(FooClass, {});
    const fooClassObjectWithProperty: FooClass = await Mapper.create(FooClass, {property: 'a'});
    const fooClassString: unknown = await Mapper.create(FooClass, 'a');
    const fooClassNumber: unknown = await Mapper.create(FooClass, 2);
    const fooClassBoolean: unknown = await Mapper.create(FooClass, true);
    const fooClassArray: unknown = await Mapper.create(FooClass, [{}]);

    // ----------------------------------------------   Class[]   ----------------------------------------------------

    const fooClassArrayOfFooClass: FooClass[] = await Mapper.create([FooClass], [new FooClass()]);
    const fooClassArrayOfObjects: FooClass[] = await Mapper.create([FooClass], [{}]);
    const fooClassArrayOfString: FooClass[] = await Mapper.create([FooClass], ['a']);
    const fooClassArrayOfBooleans: FooClass[] = await Mapper.create([FooClass], [true]);
    const fooClassArrayOfNumbers: FooClass[] = await Mapper.create([FooClass], [2]);
    const fooClassArrayTupleWithObjectNotArrayData: unknown = await Mapper.create([FooClass, FooClass], {});
    const fooClassArrayTupleWithBooleanData: unknown = await Mapper.create([FooClass, FooClass], true);
    const fooClassArrayTupleWithStringData: unknown = await Mapper.create([FooClass, FooClass], 'a');
    const fooClassArrayTupleWithNumberData: unknown = await Mapper.create([FooClass, FooClass], 2);
    const fooClassArrayTupleWithTData: unknown = await Mapper.create([FooClass, FooClass], new FooClass());

}

checkTyping()
