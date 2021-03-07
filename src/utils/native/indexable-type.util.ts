import { IndexableType } from '../../types/indexable-type.type';
import { IndexSignatureDeclaration, SyntaxKind } from 'ts-morph';
import * as chalk from 'chalk';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { throwWarning } from '../errors.util';
import { StringOrNumber } from '../../types/string-or-number.type';
import { isNumericString, isString } from './strings.util';
import { areBothTrueOrFalse } from './any.util';




export function hasIndexableType(declaration: ClassOrInterfaceDeclaration): boolean {
    return declaration.getDescendantsOfKind(SyntaxKind.IndexSignature).length > 0;
}


export function getIndexableType(declaration: ClassOrInterfaceDeclaration): IndexableType {
    const indexSignatures: IndexSignatureDeclaration[] = declaration.getDescendantsOfKind(SyntaxKind.IndexSignature);
    if (indexSignatures.length === 0) {
        return undefined;
    } else if (indexSignatures.length === 1) {
        return getIndexableKey(indexSignatures[0]);
    } else {
        throwWarning(`${declaration?.getName()} has multiple index signatures.`);
        return undefined;
    }
}

function getIndexableKey(indexSignature: IndexSignatureDeclaration): IndexableType {
    return {returnType: keyReturnType(indexSignature), type: keyType(indexSignature)};
}


function keyReturnType(indexSignature: IndexSignatureDeclaration): string {
    // console.log(chalk.blueBright('KEY STRUCTTTT'), indexSignature?.getStructure());
    return indexSignature?.getStructure()?.returnType as string;
}


function keyType(indexSignature: IndexSignatureDeclaration): 'string' | 'number' {
    // console.log(chalk.blueBright('KEY STRUCTTTT'), indexSignature?.getStructure());
    return indexSignature?.getStructure()?.keyType as 'string' | 'number';
}


export function keyHasSameTypeThanIndexable(key: StringOrNumber, indexableType: IndexableType): boolean {
    return areBothTrueOrFalse(hasNumericKey(indexableType), isNumericString(key?.toString()));
}

export function hasNumericKey(indexableType: IndexableType): boolean {
    return indexableType?.type === 'number';
}

