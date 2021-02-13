import { ArrayTypeNode, LiteralTypeNode, TypeLiteralNode, TypeReferenceNode } from 'ts-morph';

export type TypeDeclarationNode = LiteralTypeNode | TypeReferenceNode | ArrayTypeNode | TypeLiteralNode;
