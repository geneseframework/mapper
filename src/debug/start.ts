import { Mapper } from '../mapper/mapper';
import * as chalk from 'chalk';
import { CAT } from './project/src/mocks/cat.mock';
import { Cat } from './project/src/models/cat.model';

async function start() {
    console.log(chalk.yellowBright('Starts Debug process...'));
    const catMapper = new Mapper(Cat);
    console.log(chalk.cyanBright('catMapperrrrr'), catMapper);
    await catMapper.create(CAT);
}

start()
