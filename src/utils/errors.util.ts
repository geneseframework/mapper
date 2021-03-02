import * as chalk from 'chalk';


export function throwError(message = 'Error', value: any = ''): any {
    console.log(chalk.redBright(message), value);
    throw Error(value);
}

export function throwWarning(message = 'Warning', value: any = ''): any {
    console.log(chalk.yellowBright(message), value);
}

export function throwIncompatibility(target: string, data: any = ''): any {
    console.log(chalk.yellowBright(`Warning: target "${target}" incompatible with data :`), data);
}
