import { HierarchicTypeLiteral } from '../models/hierarchic-type-literal.model';
import { Node, SyntaxKind, TypeAliasDeclaration, TypeLiteralNode } from 'ts-morph';

export class HierarchicTypeLiteralService {

    static create(declaration: TypeAliasDeclaration): HierarchicTypeLiteral[] {
        return this.getTypeLiterals(declaration, []);
    }


    private static getTypeLiterals(node: Node, typeLiterals: HierarchicTypeLiteral[]): HierarchicTypeLiteral[] {
        const htls: HierarchicTypeLiteral[] = [];
        for (const typeLiteral of this.getTypeLiteralAncestors(node)) {
            if (this.isTrivialTypeLiteral(typeLiteral)) {

            }
        }
        return htls;
    }


    private static isTrivialTypeLiteral(typeLiteralNode: TypeLiteralNode): boolean {
        return !typeLiteralNode.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
    }


    private static getTypeLiteralAncestors(node: Node): TypeLiteralNode[] {
        const typeLiteralNodes: TypeLiteralNode[] = [];
        for (const typeLiteralNode of node.getDescendantsOfKind(SyntaxKind.TypeLiteral)) {
            if (this.isTypeLiteralAncestor(typeLiteralNode)) {
                typeLiteralNodes.push(typeLiteralNode)
            }
        }
        return typeLiteralNodes;
    }


    private static isTypeLiteralAncestor(typeLiteralNode: TypeLiteralNode): boolean {
        return !typeLiteralNode.getFirstAncestorByKind(SyntaxKind.TypeLiteral);
    }

}
