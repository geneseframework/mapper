import * as chalk from 'chalk';
import { PrimitiveType, primitiveTypes } from '../types/primitives.type';


export function isPrimitiveConstructor(target: any): boolean {
    return [String, Number, Boolean, Date].includes(target);
}


export function isUnionType(typeName: string): boolean {
    console.log(chalk.blueBright('IS UTTTTT'), typeName?.includes(' | '));
    return typeName?.includes(' | ');
}


export function isObjectTypeName(typeName: string): boolean {
    return ['object', 'Object'].includes(typeName);
}


export function isPrimitiveTypeName(typeName: string): typeName is PrimitiveType {
    return primitiveTypes.includes(typeName?.toLowerCase());
}


export function isDateTypeName(typeName: string): boolean {
    return ['date', 'Date'].includes(typeName);
}


