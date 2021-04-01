import { TypeAliasDeclaration } from 'ts-morph';
import { PropertyDeclarationOrSignature } from './property-declaration-or-signature.type';

/**
 * Type checking if a getStructure() method exists for a ts-morph Node
 */
export type HasStructureType =  TypeAliasDeclaration | PropertyDeclarationOrSignature;

