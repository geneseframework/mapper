import { Mapper } from '../mapper/mapper';
import * as chalk from 'chalk';
import { Cat } from './project/src/models/cat.model';
import { CAT_DATA_0 } from './project/src/data/cat.data';
import { ARRAY_CAT_DATAS } from './project/src/data/array-cats.data';

async function start() {
    console.log(chalk.yellowBright('Starts Debug process...'));
    const catMapper = new Mapper(Cat);
    const cat: Cat[] = await catMapper.create(ARRAY_CAT_DATAS);
    // const cat: Cat = await catMapper.create(CAT_DATA_0);
    console.log(chalk.blueBright('CATTTT'), cat);
}

start()
