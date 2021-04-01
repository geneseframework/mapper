import { OptionalKind, TypeParameterDeclarationStructure } from 'ts-morph';

/**
 * Types having a generic parameter
 */
export type GenericParameter = string | OptionalKind<TypeParameterDeclarationStructure>;
