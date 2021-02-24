import { Create } from '../../models/create';
import * as chalk from 'chalk';
import { Cat } from './src/models/cat.model';
import { ARRAY_CAT_DATAS } from './src/data/array-cats.data';
import { GLOBAL } from '../../const/global.const';

GLOBAL.debug = true;

async function start() {
    console.log(chalk.yellowBright('Starts application...'));
    // TODO : fix typing
    const cats: any = await Create.create([Cat], ARRAY_CAT_DATAS);
    // const cats: Cat[] = await Create.create(Cat, ARRAY_CAT_DATAS);
    console.log(chalk.yellowBright('Typed object : '), cats);
}

start()
