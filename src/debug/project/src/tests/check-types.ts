// -------------------------------------------------------------------------------------------------
// ---------------------------------------   Check returned types   --------------------------------
// -------------------------------------------------------------------------------------------------


import { Mapper } from '../../../../models/mapper';
import { PersonCatSpec } from './classes.spec';
import * as chalk from 'chalk';
import { WrongDataType } from '../../../../types/wrong-data-type.type';

let valueAny: any;
let valueUnknown: unknown;
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

    // ---------------------------------------------   Booleans   -----------------------------------------------------

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

    // ---------------------------------------------   Dates   -----------------------------------------------------

    const primitiveDate: Date = await Mapper.create(Date, 1614094099126);
    const primitiveDateDate: Date = await Mapper.create(Date, 'Tue Feb 23 2021');
    const primitiveDateType: Date = await Mapper.create(Date, 'a');
    const primitiveDateTypeDate: WrongDataType = await Mapper.create(Date, false);
    const primitiveDateObject: WrongDataType = await Mapper.create(Date, {});

    // -----------------------------------------------   Class   -----------------------------------------------------

    const personCatSpecObject: PersonCatSpec = await Mapper.create(PersonCatSpec, {});
    const personCatSpecObjectWithProperty: PersonCatSpec = await Mapper.create(PersonCatSpec, {property: 'a'});
    const personCatSpecString: WrongDataType = await Mapper.create(PersonCatSpec, 'a');
    const personCatSpecNumber: WrongDataType = await Mapper.create(PersonCatSpec, 2);
    const personCatSpecBoolean: WrongDataType = await Mapper.create(PersonCatSpec, true);
    const personCatSpecArray: WrongDataType = await Mapper.create(PersonCatSpec, [{}]);

    // ----------------------------------------------   Class[]   ----------------------------------------------------

    const personCatSpecArrayOfPersonCatSpec: PersonCatSpec[] = await Mapper.create([PersonCatSpec], [new PersonCatSpec()]);
    const personCatSpecArrayOfObjects: PersonCatSpec[] = await Mapper.create([PersonCatSpec], [{}]);
    const personCatSpecArrayOfString: WrongDataType = await Mapper.create([PersonCatSpec], ['a']);
    const personCatSpecArrayOfBooleans: WrongDataType = await Mapper.create([PersonCatSpec], [true]);
    const personCatSpecArrayOfNumbers: WrongDataType = await Mapper.create([PersonCatSpec], [2]);
    const personCatSpecTupleWithObjectNotArrayData: WrongDataType = await Mapper.create([PersonCatSpec, PersonCatSpec], {});
    const personCatSpecTupleWithBooleanData: WrongDataType = await Mapper.create([PersonCatSpec, PersonCatSpec], true);
    const personCatSpecTupleWithStringData: WrongDataType = await Mapper.create([PersonCatSpec, PersonCatSpec], 'a');
    const personCatSpecTupleWithNumberData: WrongDataType = await Mapper.create([PersonCatSpec, PersonCatSpec], 2);
    const personCatSpecTupleWithTData: WrongDataType = await Mapper.create([PersonCatSpec, PersonCatSpec], new PersonCatSpec());
    const zzz = new PersonCatSpec();
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
