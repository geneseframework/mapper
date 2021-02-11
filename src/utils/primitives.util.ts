export function hasPrimitiveType(element: any): boolean {
    if (element === undefined || element === null) {
        return false;
    }
    return primitiveTypes.includes(typeof element);
}


export function isPrimitiveTypeOrArrayOfPrimitiveTypes(typeName: string): boolean {
    return isPrimitiveType(typeName) || isArrayOfPrimitiveType(typeName);
}


export function isPrimitiveType(typeName: string): boolean {
    return primitiveTypes.includes(typeName);
}


export function isArrayOfPrimitiveType(typeName: string): boolean {
    return primitiveTypes.includes(typeName.slice(0, -2));
}


export const primitiveTypes = ['string', 'number', 'boolean'];


export type PrimitiveElement = string | number | boolean;


export type ArrayOfPrimitiveElements = string[] | number[] | boolean[];


export type PrimitiveType = 'string' | 'number' | 'boolean';


export type PrimitiveTypes = 'string[]' | 'number[]' | 'boolean[]';

