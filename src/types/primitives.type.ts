import { SyntaxKind } from 'ts-morph';
import { isString } from '../utils/native/strings.util';
import { isNumber } from '../utils/native/numbers.util';
import { isBoolean } from '../utils/native/booleans.util';

export const primitiveTypes = ['string', 'number', 'boolean'];


export type Primitive = string | number | boolean;
export function isPrimitive(value: any): value is Primitive {
    return isString(value) || isNumber(value) || isBoolean(value);
}


export type ArrayOfPrimitiveElements = string[] | number[] | boolean[];


export type PrimitiveTypeName = 'string' | 'number' | 'boolean';


export type PrimitiveConstructor = StringConstructor | NumberConstructor | BooleanConstructor;
export function isPrimitiveConstructor(type: any): type is PrimitiveConstructor {
    return [String, Number, Boolean].includes(type);
}

export const PRIMITIVE_KEYWORDS = [SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword, SyntaxKind.StringKeyword, SyntaxKind.NumberKeyword, SyntaxKind.BooleanKeyword];

