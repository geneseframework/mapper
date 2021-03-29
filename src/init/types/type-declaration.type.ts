import {
    ClassDeclaration,
    EnumDeclaration,
    InterfaceDeclaration,
    PropertyDeclaration, PropertySignature,
    TypeAliasDeclaration
} from 'ts-morph';
import { DateDeclaration } from './date-declaration.model';


export type Declaration =  ClassDeclaration | EnumDeclaration | InterfaceDeclaration | TypeAliasDeclaration;

export type GenericableDeclaration =  ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration;

export type DeclarationOrDate =  Declaration | DateDeclaration;

export type TypeOrPropertyDeclaration = TypeAliasDeclaration | PropertyDeclaration;

export type TypeOrPropertyDeclarationOrSignature = TypeAliasDeclaration | PropertyDeclaration | PropertySignature;
