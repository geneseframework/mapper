import * as chalk from 'chalk';

export function throwError(message = '', value: any = ''): never {
    console.log(chalk.redBright(`Error : ${message}`), value);
    throw Error(value);
}

export function throwWarning(message = '', value: any = ''): void {
    console.log(chalk.yellowBright(`Warning : ${message}`), value);
}
