import { PropertyDeclaration, TypeAliasDeclaration } from 'ts-morph';

export class HierarchicTypeLiteral {
    children: HierarchicTypeLiteral[] = [];
    isTrivial: boolean = false;
    rank: number = undefined;
    root: PropertyDeclaration | TypeAliasDeclaration = undefined;
}
