import { Mapper } from '../mapper/mapper';
import * as chalk from 'chalk';
import { Cat } from './project/src/models/cat.model';
import { CAT_DATA_0 } from './project/src/data/cat.data';
import { ARRAY_CAT_DATAS } from './project/src/data/array-cats.data';
import { STRING_DATA, STRING_DATAS } from './project/src/data/string.data';

async function start() {
    // await Mapper.init();
    console.log(chalk.yellowBright('Starts application...'));
    // const catMapper = new Mapper('number[]');
    // const cat: string[] = await catMapper.create(STRING_DATAS);
    // const catMapper = new Mapper(Cat);
    // const cat: Cat[] = await catMapper.create(ARRAY_CAT_DATAS);
    const cat: Cat[] = await Mapper.create(Cat, ARRAY_CAT_DATAS);
    // const cat: Cat = await catMapper.create(['ee']);
    console.log(chalk.yellowBright('Typed object : '), cat);
}

start()
