import { ArrayTypeNode, LiteralTypeNode, SyntaxKind, TypeNode } from 'ts-morph';
import * as chalk from 'chalk';
import { PrimitiveType, primitiveTypes } from '../types/primitives.type';
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


export function isPrimitiveTypeOrArrayOfPrimitiveTypeNodes(typeNode: TypeNode): boolean
export function isPrimitiveTypeOrArrayOfPrimitiveTypeNodes(typeName: string): boolean
export function isPrimitiveTypeOrArrayOfPrimitiveTypeNodes(typeNameOrNode: string | TypeNode): boolean {
    if (typeof typeNameOrNode === 'string') {
        return isPrimitiveTypeNode(typeNameOrNode) || isArrayOfPrimitiveTypeNodes(typeNameOrNode);
    } else if (typeNameOrNode instanceof ArrayTypeNode) {
        return isPrimitiveTypeNode(typeNameOrNode.getElementTypeNode());
    } else {
        return isPrimitiveTypeNode(typeNameOrNode);
    }
}


export function isPrimitiveTypeNode(typeNode: TypeNode): boolean
export function isPrimitiveTypeNode(typeName: string): boolean
export function isPrimitiveTypeNode(typeNameOrNode: string | TypeNode): boolean {
    return typeof typeNameOrNode === 'string' ? primitiveTypes.includes(typeNameOrNode) : isLiteralPrimitive(typeNameOrNode);
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


export function isLiteralPrimitive(typeNode: TypeNode): boolean {
    console.log(chalk.blueBright('IS LIT PRIMMMMM'), typeNode.getKindName());
    if (typeNode instanceof LiteralTypeNode) {
        return [SyntaxKind.StringLiteral, SyntaxKind.NumericLiteral].includes(typeNode.getLiteral().getKind());
    } else {
        return [SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword, SyntaxKind.StringKeyword, SyntaxKind.NumberKeyword, SyntaxKind.BooleanKeyword].includes(typeNode.getKind());
    }
}


export function isLiteralKeyword(typeNode: TypeNode): boolean {
    return [SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword, SyntaxKind.StringKeyword, SyntaxKind.NumberKeyword, SyntaxKind.BooleanKeyword].includes(typeNode.getKind());
}


export function primitiveLiteralValue(literalTypeNode: LiteralTypeNode): string {
    console.log(chalk.greenBright('primitiveLiteralValueeeee'), literalTypeNode?.getText());
    if (isLiteralKeyword(literalTypeNode)) {
        return literalTypeNode?.getText();
    }
    return isLiteralPrimitive(literalTypeNode) ? literalValue(literalTypeNode) : undefined;
    // return isLiteralPrimitive(literalTypeNode) ? literalTypeNode.getLiteral().getText().slice(1, -1) : undefined;
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
    console.log(chalk.redBright('PRIM LITERALLLLLL VAL'), literalTypeNode?.getKindName());
    const literal: LiteralNode = literalTypeNode?.getLiteral();
    switch (literal.getKind()) {
        case SyntaxKind.NumericLiteral:
            return literal.getText();
        case SyntaxKind.StringLiteral:
            return literal.getText().slice(1, -1);
        default:
            console.log(chalk.redBright('Unknown Literal value type : '), literal?.getKindName(), literal?.getText());
            return undefined;
    }
}
