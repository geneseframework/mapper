import * as chalk from 'chalk';
import { PrimitiveTypeName, primitiveTypes } from '../../types/primitives.type';


export function isUnionType(typeName: string): boolean {
    console.log(chalk.blueBright('IS UTTTTT'), typeName?.includes(' | '));
    return typeName?.includes(' | ');
}


export function isObjectTypeName(typeName: string): boolean {
    return ['object', 'Object'].includes(typeName);
}


export function isPrimitiveTypeName(typeName: string): typeName is PrimitiveTypeName {
    return primitiveTypes.includes(typeName?.toLowerCase());
}


export function isDateTypeName(typeName: string): boolean {
    return ['date', 'Date'].includes(typeName);
}


