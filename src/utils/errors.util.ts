import * as chalk from 'chalk';


export function throwErrorCustom(message = 'Error encountered', value: any = ''): any {
    console.log(chalk.redBright(message), value);
    throw Error(message);
}


export function throwWarning(message = 'Error encountered', value: any = ''): any {
    console.log(chalk.yellowBright(message), value);
    throw Error(message);
}
