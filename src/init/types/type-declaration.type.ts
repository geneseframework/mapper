import {
    ClassDeclaration,
    EnumDeclaration,
    InterfaceDeclaration,
    PropertyDeclaration, PropertySignature,
    TypeAliasDeclaration
} from 'ts-morph';
import { DateDeclaration } from './date-declaration.model';

/**
 * Declarations which may be used by the create() method
 */
export type Declaration =  ClassDeclaration | EnumDeclaration | InterfaceDeclaration | TypeAliasDeclaration;

/**
 * Declarations which may be generic
 */
export type GenericableDeclaration =  ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration;

/**
 * Declaration corresponding to a DateDeclaration or to other declarations which may be used by the create() method
 */
export type DeclarationOrDate =  Declaration | DateDeclaration;

/**
 * Union of Declaration Node types which may have TypeLiteral Nodes corresponding to a stringified type
 */
export type TypeOrPropertyDeclarationOrSignature = TypeAliasDeclaration | PropertyDeclaration | PropertySignature;
