import { LiteralTypeNode, SyntaxKind } from 'ts-morph';
import { PrimitiveType, primitiveTypes, TLiteral } from '../types/primitives.type';
import * as chalk from 'chalk';

export function hasPrimitiveType(element: any): boolean {
    if (element === undefined || element === null) {
        return false;
    }
    return primitiveTypes.includes(typeof element);
}


export function isPrimitiveTypeOrArrayOfPrimitiveTypes(typeName: string): boolean {
    return isPrimitiveType(typeName) || isArrayOfPrimitiveType(typeName);
}


export function isPrimitiveType(typeNameOrNode: string | LiteralTypeNode): boolean {
    return typeof typeNameOrNode === 'string' ? primitiveTypes.includes(typeNameOrNode) : isPrimitiveLiteral(typeNameOrNode);
}


export function isArrayOfPrimitiveType(typeName: string): boolean {
    return primitiveTypes.includes(typeName.slice(0, -2));
}


export function isPrimitiveLiteral(literalTypeNode: LiteralTypeNode): boolean {
    return [SyntaxKind.StringLiteral, SyntaxKind.NumericLiteral, SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword].includes(literalTypeNode.getLiteral().getKind());
}


export function literalToPrimitive(literalTypeNode: LiteralTypeNode): TLiteral {
    switch (literalTypeNode.getLiteral().getKind()) {
        case SyntaxKind.StringLiteral:
            return 'string';
        case SyntaxKind.NumericLiteral:
            return 'number';
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
            return 'boolean';
        case SyntaxKind.TypeReference:
            return 'TypeReferenceNode';
        case SyntaxKind.ArrayType:
            return 'ArrayTypeNode';
        default:
            console.log(chalk.redBright('UNKNOWN LITERAL TYPEEEEE'), literalTypeNode.getKindName());
            return undefined;
    }
}
