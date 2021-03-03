import { PrimitiveType, primitiveTypes } from '../../types/primitives.type';


export function isObjectTypeName(typeName: string): boolean {
    return ['object', 'Object'].includes(typeName);
}


export function isPrimitiveTypeName(typeName: string): typeName is PrimitiveType {
    return primitiveTypes.includes(typeName?.toLowerCase());
}


export function isDateTypeName(typeName: string): boolean {
    return ['date', 'Date'].includes(typeName);
}


