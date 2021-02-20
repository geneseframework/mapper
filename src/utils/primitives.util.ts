import { ArrayTypeNode, LiteralTypeNode, SyntaxKind, TypeNode } from 'ts-morph';
import * as chalk from 'chalk';
import { PRIMITIVE_KEYWORDS, PrimitiveType, primitiveTypes } from '../types/primitives.type';
import { LiteralNode } from '../types/literal-node.type';

export function isPrimitiveOrArrayOfPrimitivesValue(value: any): boolean {
    const values: any[] = Array.isArray(value) ? value : [value];
    return values.every(e => isPrimitiveValue(e));
}


export function isPrimitiveValue(value: any): boolean {
    if (value === undefined || value === null) {
        return false;
    }
    return primitiveTypes.includes(typeof value);
}


export function isPrimitiveValueWithCorrectType(value: any, typeName: PrimitiveType): boolean {
    return isPrimitiveValue(value) && typeName === typeof value;
}


export function isPrimitiveOrPrimitivesArray(typeNode: TypeNode): boolean
export function isPrimitiveOrPrimitivesArray(typeName: string): boolean
export function isPrimitiveOrPrimitivesArray(typeNameOrNode: string | TypeNode): boolean {
    if (typeof typeNameOrNode === 'string') {
        return isPrimitiveTypeNode(typeNameOrNode) || isArrayOfPrimitiveTypeNodes(typeNameOrNode);
    } else if (typeNameOrNode instanceof ArrayTypeNode) {
        return isPrimitiveTypeNode(typeNameOrNode.getElementTypeNode());
    } else {
        return isPrimitiveTypeNode(typeNameOrNode);
    }
}


export function isArrayOfPrimitiveTypeNodes(typeNode: TypeNode): boolean
export function isArrayOfPrimitiveTypeNodes(typeName: string): boolean
export function isArrayOfPrimitiveTypeNodes(typeNameOrNode: string | TypeNode): boolean {
    if (typeof typeNameOrNode === 'string') {
        return primitiveTypes.includes(typeNameOrNode.slice(0, -2));
    } else if (typeNameOrNode instanceof ArrayTypeNode) {
        return isPrimitiveTypeNode(typeNameOrNode.getElementTypeNode());
    } else {
        return false;
    }
}


export function isPrimitiveTypeNode(typeNode: TypeNode): boolean
export function isPrimitiveTypeNode(typeName: string): boolean
export function isPrimitiveTypeNode(typeNameOrNode: string | TypeNode): boolean {
    return typeof typeNameOrNode === 'string' ? primitiveTypes.includes(typeNameOrNode?.toLowerCase()) : isLiteralPrimitive(typeNameOrNode);
}


export function isLiteralPrimitive(typeNode: TypeNode): boolean {
    if (typeNode instanceof LiteralTypeNode) {
        return [SyntaxKind.StringLiteral, SyntaxKind.NumericLiteral].includes(typeNode.getLiteral()?.getKind());
    } else {
        return PRIMITIVE_KEYWORDS.includes(typeNode.getKind());
    }
}


export function isLiteralKeyword(typeNode: TypeNode): boolean {
    return PRIMITIVE_KEYWORDS.includes(typeNode.getKind());
}


export function primitiveLiteralValue(literalTypeNode: LiteralTypeNode): string {
    if (isLiteralKeyword(literalTypeNode)) {
        return literalTypeNode?.getText();
    }
    return isLiteralPrimitive(literalTypeNode) ? literalValue(literalTypeNode) : undefined;
}


export function literalPrimitiveToPrimitiveType(literalTypeNode: LiteralTypeNode): PrimitiveType {
    switch (literalTypeNode?.getLiteral()?.getKind()) {
        case SyntaxKind.StringLiteral:
            return 'string';
        case SyntaxKind.NumericLiteral:
            return 'number';
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
            return 'boolean';
        default:
            console.log(chalk.redBright(`${literalTypeNode?.getLiteral()?.getKindName()} is not a LiteralPrimitive`));
            return undefined;
    }
}


export function literalValue(literalTypeNode: LiteralTypeNode): string {
    const literal: LiteralNode = literalTypeNode?.getLiteral();
    switch (literal.getKind()) {
        case SyntaxKind.NumericLiteral:
            return literal.getText();
        case SyntaxKind.StringLiteral:
            return literal.getText().slice(1, -1);
        default:
            console.log(chalk.yellowBright('Warning: unknown Literal value type : '), literal?.getKindName(), literal?.getText());
            return undefined;
    }
}


export function typeOfDataCorrespondsToPrimitiveKeyword(data: any, arrayTypeNode: ArrayTypeNode): boolean {
    const elementTypeNode = arrayTypeNode.getElementTypeNode();
    return PRIMITIVE_KEYWORDS.includes(elementTypeNode?.getKind()) && (
        (typeof data === 'string' && elementTypeNode?.getKind() === SyntaxKind.StringKeyword)
        || (typeof data === 'number' && elementTypeNode?.getKind() === SyntaxKind.NumberKeyword)
        || (typeof data === 'boolean' && elementTypeNode?.getKind() === SyntaxKind.BooleanKeyword)
    );
}
