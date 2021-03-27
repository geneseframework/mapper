import { TypeAliasDeclaration } from 'ts-morph';
import { PropertyDeclarationOrSignature } from './property-declaration-or-signature.type';

export type HasStructureType =  TypeAliasDeclaration | PropertyDeclarationOrSignature;

