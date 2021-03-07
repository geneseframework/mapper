import { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { DateDeclaration } from '../models/date-declaration.model';

export type Declaration =  ClassDeclaration | EnumDeclaration | InterfaceDeclaration | TypeAliasDeclaration | DateDeclaration;

