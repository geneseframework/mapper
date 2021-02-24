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

/**
 * The compilation should crash if one of the result values has wrong type
 */
async function checkTypes() {

    // ---------------------------------------------   Strings   -----------------------------------------------------

    const primitiveString: string = await Mapper.create('string', 'a');
    const primitiveStringValueAny: string = await Mapper.create('string', valueAny);
    const primitiveStringValueUnknown: string = await Mapper.create('string', valueUnknown);
    const primitiveStringNumber: unknown = await Mapper.create('string', 2);
    const primitiveStringObject: unknown = await Mapper.create('string', {});

    const primitiveStringConstructor: string = await Mapper.create(String, 'a');
    const primitiveStringConstructorNumber: unknown = await Mapper.create(String, 2);
    const primitiveStringConstructorValueAny: string = await Mapper.create(String, valueAny);
    const primitiveStringConstructorValueUnknown: string = await Mapper.create(String, valueUnknown);

    const primitiveStringConstructorArrayStringArray: string[] = await Mapper.create([String], ['a', 'b']);
    const primitiveStringConstructorArrayString: unknown = await Mapper.create([String], 'a');
    const primitiveStringConstructorArrayNumber: unknown = await Mapper.create([String], 2);
    const primitiveStringConstructorArrayNumberArray: string[] = await Mapper.create([String], [2, 3]);
    const primitiveStringConstructorArrayValueAny: string[] = await Mapper.create([String], valueAny);
    const primitiveStringConstructorArrayValueUnknown: string[] = await Mapper.create([String], valueUnknown);

    const primitiveStringArray: string[] = await Mapper.create('string[]', ['a', 'b']);
    const primitiveStringArrayDifferentTypes: string[] = await Mapper.create('string[]', ['a', 2]);
    const primitiveStringArrayString: unknown = await Mapper.create('string[]', 'a');
    const primitiveStringArrayObject: unknown = await Mapper.create('string[]', {a: 3});

    // ---------------------------------------------   Numbers   -----------------------------------------------------

    const primitiveNumber: number = await Mapper.create('number', 3);
    const primitiveNumberNumber: unknown = await Mapper.create('number', 'a');
    const primitiveNumberObject: unknown = await Mapper.create('number', {});

    const primitiveNumberType: number = await Mapper.create(Number, 3);
    const primitiveNumberTypeNumber: unknown = await Mapper.create(Number, 'a');

    const primitiveNumberConstructorType: number[] = await Mapper.create([Number], [3, 4]);
    const primitiveNumberConstructorTypeNumber: unknown = await Mapper.create([Number], 'a');

    const primitiveNumberArray: number[] = await Mapper.create('number[]', [3, 4]);
    const primitiveNumberArrayDifferentTypes: number[] = await Mapper.create('number[]', ['a', 4]);
    const primitiveNumberArrayWrong: unknown = await Mapper.create('number[]', 3);

    // -------------------------------------------------   Booleans   -----------------------------------------------------

    const primitiveBoolean: boolean = await Mapper.create('boolean', false);
    const primitiveBooleanBoolean: unknown = await Mapper.create('boolean', 'a');
    const primitiveBooleanObject: unknown = await Mapper.create('boolean', {});

    const primitiveBooleanType: boolean = await Mapper.create(Boolean, false);
    const primitiveBooleanTypeBoolean: unknown = await Mapper.create(Boolean, 'a');

    const primitiveBooleanConstructorType: boolean[] = await Mapper.create([Boolean], [false, true]);
    const primitiveBooleanConstructorTypeBoolean: unknown = await Mapper.create([Boolean], 'a');

    const primitiveBooleanArray: boolean[] = await Mapper.create('boolean[]', [false, true]);
    const primitiveBooleanArrayDifferentTypes: boolean[] = await Mapper.create('boolean[]', ['a', true]);
    const primitiveBooleanArrayWrong: unknown = await Mapper.create('boolean[]', false);

    // -------------------------------------------   Objects (not arrays)   -----------------------------------------------

    const primitiveObject: object = await Mapper.create('object', {a: 2});
    const primitiveObjectString: unknown = await Mapper.create('object', 'a');
    const primitiveObjectNumber: unknown = await Mapper.create('object', 2);
    const primitiveObjectArray: unknown = await Mapper.create('object', [2]);

    const primitiveObjectConstructorObject: object = await Mapper.create('object', {a: 2});
    const primitiveObjectConstructorBoolean: unknown = await Mapper.create(Object, false);
    const primitiveObjectConstructorString: unknown = await Mapper.create(Object, 'a');

    const primitiveObjectConstructorArrayBooleans: object[] = await Mapper.create([Object], [false, true]);
    const primitiveObjectConstructorTypeObject: unknown = await Mapper.create([Object], 'a');

    const primitiveObjectArrayBooleans: object[] = await Mapper.create('object[]', [false, true]);
    const primitiveObjectArrayDifferentTypes: object[] = await Mapper.create('object[]', ['a', true]);
    const primitiveObjectArrayWrong: unknown = await Mapper.create('object[]', false);

    // ---------------------------------------------   Dates   -----------------------------------------------------

    const primitiveDate: Date = await Mapper.create(Date, 1614094099126);
    const primitiveDateDate: Date = await Mapper.create(Date, 'Tue Feb 23 2021');
    const primitiveDateType: Date = await Mapper.create(Date, 'a');
    const primitiveDateTypeDate: unknown = await Mapper.create(Date, false);
    const primitiveDateObject: unknown = await Mapper.create(Date, {});

    const primitiveDateArray: Date[] = await Mapper.create([Date], [1614094099126, 1614094099127]);
    const primitiveDateDateArray: Date[] = await Mapper.create([Date], ['Tue Feb 23 2021', 'Tue Feb 24 2021']);
    const primitiveDateTypeArray: Date[] = await Mapper.create([Date], ['a', 'b']);
    const primitiveDateTypeDateArray: unknown = await Mapper.create([Date], false);
    const primitiveDateObjectArray: unknown = await Mapper.create([Date], {});

    // -----------------------------------------------   Class   -----------------------------------------------------

    const personCatSpecObject: FooClass = await Mapper.create(FooClass, {});
    const personCatSpecObjectWithProperty: FooClass = await Mapper.create(FooClass, {property: 'a'});
    const personCatSpecString: unknown = await Mapper.create(FooClass, 'a');
    const personCatSpecNumber: unknown = await Mapper.create(FooClass, 2);
    const personCatSpecBoolean: unknown = await Mapper.create(FooClass, true);
    const personCatSpecArray: unknown = await Mapper.create(FooClass, [{}]);

    // ----------------------------------------------   Class[]   ----------------------------------------------------

    const personCatSpecArrayOfFooClass: FooClass[] = await Mapper.create([FooClass], [new FooClass()]);
    const personCatSpecArrayOfObjects: FooClass[] = await Mapper.create([FooClass], [{}]);
    const personCatSpecArrayOfString: FooClass[] = await Mapper.create([FooClass], ['a']);
    const personCatSpecArrayOfBooleans: FooClass[] = await Mapper.create([FooClass], [true]);
    const personCatSpecArrayOfNumbers: FooClass[] = await Mapper.create([FooClass], [2]);
    const personCatSpecTupleWithObjectNotArrayData: unknown = await Mapper.create([FooClass, FooClass], {});
    const personCatSpecTupleWithBooleanData: unknown = await Mapper.create([FooClass, FooClass], true);
    const personCatSpecTupleWithStringData: unknown = await Mapper.create([FooClass, FooClass], 'a');
    const personCatSpecTupleWithNumberData: unknown = await Mapper.create([FooClass, FooClass], 2);
    const personCatSpecTupleWithTData: unknown = await Mapper.create([FooClass, FooClass], new FooClass());


    const zzz = new FooClass();
    console.log(chalk.blueBright('ZZZZZZZ'), zzz);
    console.log(chalk.blueBright('ZZZZZZZ'), zzz.constructor);
    console.log(chalk.blueBright('ZZZZZZZ'), zzz.constructor.name);
    const aaaa = [zzz];
    console.log(chalk.magentaBright('AAAAA'), aaaa);
    console.log(chalk.magentaBright('AAAAA'), aaaa.constructor);
    console.log(chalk.magentaBright('AAAAA'), aaaa.constructor.name);
    const bbbb = {};
    console.log(chalk.cyanBright('BBBB'), bbbb);
    console.log(chalk.cyanBright('BBBB'), bbbb.constructor);
    console.log(chalk.cyanBright('BBBB'), bbbb.constructor.name);
}

checkTypes()
