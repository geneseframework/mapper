// -------------------------------------------------------------------------------------------------
// ---------------------------------------   Check returned types   --------------------------------
// -------------------------------------------------------------------------------------------------


import { Mapper } from '../../../../models/mapper';
import { PersonCatSpec } from './classes.spec';
import * as chalk from 'chalk';


/**
 * The compilation should crash if one of the result values has wrong type
 */
async function checkTypes() {
    const personCatSpec: PersonCatSpec = await Mapper.create(PersonCatSpec, {});
    const personCatSpecArrayOfPersonCatSpec: PersonCatSpec[] = await Mapper.create([PersonCatSpec], [new PersonCatSpec()]);
    const personCatSpecArrayOfObjects: PersonCatSpec[] = await Mapper.create([PersonCatSpec], [{}]);
    const personCatSpecArrayOfString: Error = await Mapper.create([PersonCatSpec], ['a']);
    const personCatSpecArrayOfBooleans: Error = await Mapper.create([PersonCatSpec], [true]);
    const personCatSpecArrayOfNumbers: Error = await Mapper.create([PersonCatSpec], [2]);
    const personCatSpecTupleWithObjectNotArrayData: Error = await Mapper.create([PersonCatSpec, PersonCatSpec], {});
    const personCatSpecTupleWithBooleanData: Error = await Mapper.create([PersonCatSpec, PersonCatSpec], true);
    const personCatSpecTupleWithStringData: Error = await Mapper.create([PersonCatSpec, PersonCatSpec], 'a');
    const personCatSpecTupleWithNumberData: Error = await Mapper.create([PersonCatSpec, PersonCatSpec], 2);
    const personCatSpecTupleWithTData: Error = await Mapper.create([PersonCatSpec, PersonCatSpec], new PersonCatSpec());
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
    // if (zzz.constructor instanceof TConstructor<any>) {
    //
    // }
    // const personCatSpecTuple: PersonCatSpec[] = await Mapper.create([PersonCatSpec, PersonCatSpec], []);
}

checkTypes()
