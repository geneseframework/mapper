/**
 * The stringified primitive types
 */
export const primitiveTypes = ['string', 'number', 'boolean'];

/**
 * The primitive types
 */
export type Primitive = string | number | boolean;

/**
 * Arrays of primitive types
 */
export type ArrayOfPrimitiveElements = string[] | number[] | boolean[];

/**
 * One of the stringified primitive types
 */
export type PrimitiveType = 'string' | 'number' | 'boolean';

/**
 * Checks if a value corresponds to a stringified primitive type
 * @param value
 */
export function isPrimitiveType(value: any): value is PrimitiveType {
    return primitiveTypes.includes(value);
}

/**
 * Primitive constructors: String, Number and Boolean
 */
export type PrimitiveConstructor = StringConstructor | NumberConstructor | BooleanConstructor;


