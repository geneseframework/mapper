import { PrimitiveType, primitiveTypes } from '../../types/primitives.type';


export function isPrimitiveTypeName(typeName: string): typeName is PrimitiveType {
    return primitiveTypes.includes(typeName?.toLowerCase());
}


