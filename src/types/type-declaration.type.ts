import { ClassDeclaration, EnumDeclaration, TypeAliasDeclaration } from 'ts-morph';

export type ClassOrTypeAliasType = 'ClassDeclaration' | 'TypeAliasDeclaration' | 'EnumDeclaration';

export type TypeDeclaration =  ClassDeclaration | EnumDeclaration | TypeAliasDeclaration;
