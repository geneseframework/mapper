import { Primitive, PrimitiveType } from '../../types/primitives.type';
import { isPrimitiveTypeName } from './types.util';


export function isNonNullOrPrimitiveValue(value: any): value is Primitive {
    if (value === undefined || value === null) {
        return false;
    }
    return isPrimitiveTypeName(typeof value);
}


export function isNonNullPrimitiveValueWithCorrectType(typeName: PrimitiveType, value: any, differentiateStringsAndNumbers = true): boolean {
    return isNonNullOrPrimitiveValue(value) && (typeName === typeof value || areStringsOrNumbersWithoutDifferentiation(typeName, value, differentiateStringsAndNumbers));
}


function areStringsOrNumbersWithoutDifferentiation(typeName: PrimitiveType, value: any, differentiateStringsAndNumbers = true): boolean {
    return !differentiateStringsAndNumbers && ((typeName === 'string' && typeof value === 'number') || (typeName === 'number' && typeof value === 'string'));
}


export function isPrimitiveTypeNode(typeNameOrNode: string): boolean {
    return isPrimitiveTypeName(typeNameOrNode?.toLowerCase());
}



export function castStringAndNumbers(typeName: string, data: string | number): string | number | typeof NaN {
    if (typeName === 'string') {
        return data?.toString();
    } else if (typeName === 'number') {
        return Number(data);
    } else {
        return data;
    }
}
