import { InterfaceDeclaration } from 'ts-morph';
import * as chalk from 'chalk';


export function isInterfaceValue(declaration: InterfaceDeclaration, value: any): boolean {
    return this.interfaceValues(declaration).includes(value);
}


export function interfaceValues(declaration: InterfaceDeclaration): any[] {
    console.log(chalk.blueBright('declaration.getStructure())))))'), declaration.getStructure());
    console.log(chalk.blueBright('declaration.getStructure())))))'), declaration.getProperties().map(p => p.getName()));
    return declaration.getProperties().map(p => p.getName());
}
