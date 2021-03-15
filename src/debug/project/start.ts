import { Mapper } from '../../create/models/mapper';
import * as chalk from 'chalk';
import { Cat } from './src/models/cat.model';
import { ARRAY_CAT_DATAS } from './src/data/array-cats.data';
import { GLOBAL } from '../../create/const/global.const';

GLOBAL.debug = true;

async function start() {
    console.log(chalk.yellowBright('Starts application...'));
    const cats: any = await Mapper.create([Cat], ARRAY_CAT_DATAS);
    console.log(chalk.yellowBright('Typed object : '), cats);
}

start()
