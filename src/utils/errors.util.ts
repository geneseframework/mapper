import * as chalk from 'chalk';


export function throwCustom(message = 'Error encountered', value: any = ''): any {
    console.log(chalk.redBright(message), value);
    throw Error(message);
}
