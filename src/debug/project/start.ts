import { Mapper } from '../../models/mapper';
import * as chalk from 'chalk';
import { Cat } from './src/models/cat.model';
import { CAT_DATA_0 } from './src/data/cat.data';
import { ARRAY_CAT_DATAS } from './src/data/array-cats.data';
import { STRING_DATA, STRING_DATAS } from './src/data/string.data';

async function start() {
    // await Mapper.init();
    console.log(chalk.yellowBright('Starts application...'));
    // const catMapper = new Mapper('number[]');
    // const cat: string[] = await catMapper.create(STRING_DATAS);
    // const catMapper = new Mapper(Cat);
    // const cat: Cat[] = await catMapper.create(ARRAY_CAT_DATAS);
    const cats: Cat[] = await Mapper.create(Cat, ARRAY_CAT_DATAS);
    // const cats: Cat[] = await Mapper.create(Cat, ARRAY_CAT_DATAS);
    // console.log(chalk.yellowBright('Typed object : '), cats);
    console.log(chalk.yellowBright('Typed object : '), cats.map(c => c.friend.family));
}

start()
