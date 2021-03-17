import { OptionalKind, TypeParameterDeclarationStructure } from 'ts-morph';

export type GenericParameter = string | OptionalKind<TypeParameterDeclarationStructure>;
