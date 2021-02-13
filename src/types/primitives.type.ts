import { SyntaxKind } from 'ts-morph';

export const primitiveTypes = ['string', 'number', 'boolean'];


export type PrimitiveElement = string | number | boolean;


export type ArrayOfPrimitiveElements = string[] | number[] | boolean[];


export type PrimitiveType = 'string' | 'number' | 'boolean';


export type PrimitiveTypes = 'string[]' | 'number[]' | 'boolean[]';


export type TLiteral = PrimitiveType | 'TypeReferenceNode' | 'ArrayTypeNode';


export type PrimitiveKeyword = SyntaxKind.TrueKeyword | SyntaxKind.FalseKeyword | SyntaxKind.StringKeyword | SyntaxKind.NumberKeyword | SyntaxKind.BooleanKeyword;
