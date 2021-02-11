import { Mapper } from '../mapper/mapper';
import * as chalk from 'chalk';
import { CAT_DATA } from './project/src/mocks/cat.mock';
import { Cat } from './project/src/models/cat.model';

async function start() {
    console.log(chalk.yellowBright('Starts Debug process...'));
    const catMapper = new Mapper(Cat);
    // console.log(chalk.cyanBright('catMapperrrrr'), catMapper);
    const cat: Cat = await catMapper.create(CAT_DATA);
    console.log(chalk.blueBright('CATTTT'), cat);
}

start()
