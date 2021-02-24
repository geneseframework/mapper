import * as chalk from 'chalk';
import { GLOBAL } from '../const/global.const';

GLOBAL.debug = true;

async function startTestTypeChecking() {
    try {
        await require(`../../src/debug/project/src/tests/test-typing`);
        console.log(chalk.greenBright(`\nType checking is correct.`));
    } catch (err) {
        console.log(chalk.redBright(`\nError in type checking.`));
    }

}

startTestTypeChecking();
