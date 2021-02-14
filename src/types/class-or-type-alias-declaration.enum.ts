import { ClassDeclaration, TypeAliasDeclaration } from 'ts-morph';

export type ClassOrTypeAliasType = 'ClassDeclaration' | 'TypeAliasDeclaration';

export type ClassOrTypeAliasDeclaration = ClassDeclaration | TypeAliasDeclaration;
