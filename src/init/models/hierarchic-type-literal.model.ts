import { PropertyDeclaration, TypeAliasDeclaration } from 'ts-morph';

export class HierarchicTypeLiteral {

    children: HierarchicTypeLiteral[] = [];
    isTrivial: boolean = false;
    rank: number = undefined;
    root: PropertyDeclaration | TypeAliasDeclaration = undefined;

    constructor(root: PropertyDeclaration | TypeAliasDeclaration, rank: number, isTrivial: boolean, children: HierarchicTypeLiteral[] = []) {
        this.root = root;
        this.rank = rank;
        this.isTrivial = isTrivial;
        this.children = children;
    }
}
