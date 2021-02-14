import { Mapper } from '../../models/mapper';
import * as chalk from 'chalk';
import { Cat } from './src/models/cat.model';
import { CAT_DATA_0 } from './src/data/cat.data';
import { ARRAY_CAT_DATAS } from './src/data/array-cats.data';
import { STRING_DATA, STRING_DATAS } from './src/data/string.data';
import { Employer } from './src/types/employer.type';
import { TYPE_EMPLOYER_DATA } from './src/data/type-interface.data';
import { Ngo } from './src/models/ngo.model';

async function start() {
    console.log(chalk.yellowBright('Starts application...'));
    // const employer: Employer = await Mapper.create<Employer>('Employer', TYPE_EMPLOYER_DATA, { isType: true });
    // console.log(chalk.yellowBright('Typed object : '), employer);
    const cats: Cat[] = await Mapper.create(Cat, ARRAY_CAT_DATAS);
    // console.log(chalk.yellowBright('Typed object : '), cats);
    console.log(chalk.yellowBright('Typed object : '), cats.map(c => c.friend.employer));
}

start()
