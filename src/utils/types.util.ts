import * as chalk from 'chalk';


export function isPrimitiveConstructor(target: any): boolean {
    return [String, Number, Boolean, Date].includes(target);
}


export function isUnionType(typeName: string): boolean {
    console.log(chalk.blueBright('IS UTTTTT'), typeName?.includes(' | '));
    return typeName?.includes(' | ');
}


