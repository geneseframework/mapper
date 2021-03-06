import { SyntaxKind } from 'ts-morph';

export const primitiveTypes = ['string', 'number', 'boolean'];


export type Primitive = string | number | boolean;


export type ArrayOfPrimitiveElements = string[] | number[] | boolean[];


export type PrimitiveType = 'string' | 'number' | 'boolean';
export function isPrimitiveType(value: any): value is PrimitiveType {
    return primitiveTypes.includes(value);
}


export type PrimitiveConstructor = StringConstructor | NumberConstructor | BooleanConstructor;

export const PRIMITIVE_KEYWORDS = [SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword, SyntaxKind.StringKeyword, SyntaxKind.NumberKeyword, SyntaxKind.BooleanKeyword];

