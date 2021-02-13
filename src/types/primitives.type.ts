import { BooleanLiteral, LiteralExpression, NullLiteral, PrefixUnaryExpression } from 'ts-morph';


export const primitiveTypes = ['string', 'number', 'boolean'];


export type PrimitiveElement = string | number | boolean;


export type ArrayOfPrimitiveElements = string[] | number[] | boolean[];


export type PrimitiveType = 'string' | 'number' | 'boolean';


export type PrimitiveTypes = 'string[]' | 'number[]' | 'boolean[]';


export type TLiteral = PrimitiveType | 'TypeReferenceNode' | 'ArrayTypeNode';
// export type Literal = NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression;

