import { Mapper } from '../../models/mapper';
import * as chalk from 'chalk';
import { Cat } from './src/models/cat.model';
import { ARRAY_CAT_DATAS } from './src/data/array-cats.data';

async function start() {
    console.log(chalk.yellowBright('Starts application...'));
    const cats: Cat[] = await Mapper.create(Cat, ARRAY_CAT_DATAS);
    console.log(chalk.yellowBright('Typed object : '), cats);
}

start()
