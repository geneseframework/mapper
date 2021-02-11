export function hasPrimitiveType(element: any): boolean {
    if (element === undefined || element === null) {
        return false;
    }
    return primitiveTypes.includes(typeof element);
}


export function isPrimitiveType(typeName: string): boolean {
    return primitiveTypes.includes(typeName);
}

export const primitiveTypes = ['string', 'number', 'boolean'];

export type PrimitiveType = 'string' | 'number' | 'boolean';

