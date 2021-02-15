import { Mapper } from '../../models/mapper';
import * as chalk from 'chalk';
import { Cat } from './src/models/cat.model';
import { CAT_DATA_BIELA, CAT_DATA_CIBI, CAT_DATA_KITTY } from './src/data/cat.data';
import { ARRAY_CAT_DATAS } from './src/data/array-cats.data';
import { STRING_DATA, STRING_DATAS } from './src/data/string.data';
import { Employer } from './src/types/employer.type';
import { TYPE_EMPLOYER_DATA } from './src/data/type-interface.data';
import { Ngo } from './src/models/ngo.model';
import { Person } from './src/models/person.model';
import { PERSON_LEO } from './src/data/person.data';

async function start() {
    console.log(chalk.yellowBright('Starts application...'));
    // const employer: Employer = await Mapper.create<Employer>('Employer', TYPE_EMPLOYER_DATA, { isType: true });
    // console.log(chalk.yellowBright('Typed object : '), employer);
    // const person: any = await Mapper.create(Person, PERSON_LEO);
    // console.log(chalk.yellowBright('Typed object : '), person);
    const cats: Cat[] = await Mapper.create(Cat, ARRAY_CAT_DATAS);
    // console.log(chalk.yellowBright('Typed object : '), cats);
    console.log(chalk.yellowBright('Typed object : '), cats.map(c => c.friend.employer));
    // console.log(chalk.yellowBright('Typed object : '), cats.map(c => c.friend.family.map(f => f.employer)));
    // console.log(chalk.yellowBright('Typed object : '), cats.map(c => c.friend.family.map(f => f.nickNames)));
    // const cat: Cat = await Mapper.create(Cat, CAT_DATA_KITTY);
    // console.log(chalk.yellowBright('Typed object : '), cat);
}

start()
