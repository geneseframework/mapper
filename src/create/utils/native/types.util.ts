import { PrimitiveType, primitiveTypes } from '../../types/trivial-types/primitives.type';


export function isPrimitiveTypeName(typeName: string): typeName is PrimitiveType {
    return primitiveTypes.includes(typeName?.toLowerCase());
}


