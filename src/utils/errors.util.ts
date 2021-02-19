import * as chalk from 'chalk';


export function throwWarning(message = 'Error encountered', value: any = ''): any {
    console.log(chalk.yellowBright(message), value);
}
