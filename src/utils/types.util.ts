import * as chalk from 'chalk';



export function isUnionType(typeName: string): boolean {
    console.log(chalk.blueBright('IS UTTTTT'), typeName?.includes(' | '));
    return typeName?.includes(' | ');
}


