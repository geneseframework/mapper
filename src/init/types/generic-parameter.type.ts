import { OptionalKind, TypeParameterDeclarationStructure } from 'ts-morph';

export type GenericParameterInit = string | OptionalKind<TypeParameterDeclarationStructure>;
