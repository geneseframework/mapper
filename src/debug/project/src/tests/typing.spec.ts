// -------------------------------------------------------------------------------------------------
// ---------------------------------------   Check returned types   --------------------------------
// -------------------------------------------------------------------------------------------------


import { Mapper } from '../../../../models/mapper';
import { PersonCatSpec } from './classes.spec';
import * as chalk from 'chalk';
import { WrongDataType } from '../../../../types/wrong-data-type.type';


/**
 * The compilation should crash if one of the result values has wrong type
 */
async function checkTypes() {
    const personCatSpec: PersonCatSpec = await Mapper.create(PersonCatSpec, {});
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
    const aaaa = [2];
    console.log(chalk.magentaBright('AAAAA'), aaaa);
    console.log(chalk.magentaBright('AAAAA'), aaaa.constructor);
    console.log(chalk.magentaBright('AAAAA'), aaaa.constructor.name);
    const bbbb = {};
    console.log(chalk.cyanBright('BBBB'), bbbb);
    console.log(chalk.cyanBright('BBBB'), bbbb.constructor);
    console.log(chalk.cyanBright('BBBB'), bbbb.constructor.name);
}

checkTypes()
