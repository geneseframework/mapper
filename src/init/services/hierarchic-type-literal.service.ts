import { HierarchicTypeLiteral } from '../models/hierarchic-type-literal.model';
import { Node, SyntaxKind, TypeLiteralNode } from 'ts-morph';
import { getFirstTypeLiteralAncestor } from '../utils/ast/ast-type-literal.util';
import { TypeOrPropertyDeclaration } from '../types/type-declaration.type';

export class HierarchicTypeLiteralService {

    static create(declaration: TypeOrPropertyDeclaration): HierarchicTypeLiteral {
        const htl = new HierarchicTypeLiteral(declaration, declaration);
        htl.children = this.createHTLChildren(declaration, declaration);
        return htl;
    }


    private static createHTLChildren(root: TypeOrPropertyDeclaration, node: Node): HierarchicTypeLiteral[] {
        const htls: HierarchicTypeLiteral[] = [];
        const ancestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(node);
        for (let i = 0; i < ancestors.length; i++) {
            const htl = new HierarchicTypeLiteral(root, node, i);
            if (this.isTrivialTypeLiteral(ancestors[i])) {
                htl.isTrivial = true;
            } else {
                // htl.children = this.createHTLChildren(ancestors[i], )
            }
            htls.push(htl);
        }
        return htls;
    }


    private static isTrivialTypeLiteral(typeLiteralNode: TypeLiteralNode): boolean {
        return !typeLiteralNode.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
    }


    private static getTypeLiteralAncestors(node: Node): TypeLiteralNode[] {
        const typeLiteralNodes: TypeLiteralNode[] = [];
        for (const typeLiteralNode of node.getDescendantsOfKind(SyntaxKind.TypeLiteral)) {
            if (this.isTypeLiteralAncestorInRootNode(typeLiteralNode, node)) {
                typeLiteralNodes.push(typeLiteralNode)
            }
        }
        return typeLiteralNodes;
    }


    private static isTypeLiteralAncestorInRootNode(typeLiteralNode: TypeLiteralNode, root: Node): boolean {
        const ancestor: TypeLiteralNode = getFirstTypeLiteralAncestor(typeLiteralNode);
        return !ancestor || ancestor !== getFirstTypeLiteralAncestor(root);
    }


    private static addProperties(htl: HierarchicTypeLiteral): void {

    }

}
