import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { DateDeclaration } from '../models/date-declaration.model';


export type Declaration =  ClassDeclaration | EnumDeclaration | InterfaceDeclaration | TypeAliasDeclaration;

export type GenericableDeclaration =  ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration;

export type DeclarationOrDate =  Declaration | DateDeclaration;
