export const primitiveTypes = ['string', 'number', 'boolean'];


export type Primitive = string | number | boolean;


export type ArrayOfPrimitiveElements = string[] | number[] | boolean[];


export type PrimitiveType = 'string' | 'number' | 'boolean';
export function isPrimitiveType(value: any): value is PrimitiveType {
    return primitiveTypes.includes(value);
}


export type PrimitiveConstructor = StringConstructor | NumberConstructor | BooleanConstructor;


