import * as chalk from 'chalk';

export function throwWarningOrError(message = '', value: any = '', error = false): void | never {
    error ? throwError(message, value) : throwWarning(message, value);
}

export function throwError(message = '', value: any = ''): never {
    console.log(chalk.redBright(`Error : ${message}`), value);
    throw Error(value);
}

export function throwWarning(message = '', value: any = ''): void {
    console.log(chalk.yellowBright(`Warning : ${message}`), value);
}

export function throwIncompatibility(target: string, data: any = ''): any {
    console.log(chalk.yellowBright(`Warning: target "${target}" incompatible with data :`), data);
}
