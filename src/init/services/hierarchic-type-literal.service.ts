import { HierarchicTypeLiteral, HierarchicTypeLiteralNode } from '../models/hierarchic-type-literal.model';
import { Node, SyntaxKind, TypeLiteralNode } from 'ts-morph';
import { getFirstTypeLiteralAncestor, hasTypeLiteral } from '../utils/ast/ast-type-literal.util';
import { TypeOrPropertyDeclaration } from '../types/type-declaration.type';
import { Property } from '../../shared/types/target/property.type';
import { declarationType, getPropertyFromPropDecOrSign } from '../utils/ast/ast-declaration.util';
import * as chalk from 'chalk';

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
            const htl = new HierarchicTypeLiteral(root, ancestors[i], i);
            console.log(chalk.magentaBright('HTL HAS TLLLLL ????'), node.getKindName(), this.isTrivialTypeLiteral(ancestors[i]));
            if (this.isTrivialTypeLiteral(ancestors[i])) {
                htl.isTrivial = true;
                this.addPropertiesAndUpdateParent(htl as HierarchicTypeLiteralNode);
            } else if (hasTypeLiteral(node)) {
                console.log(chalk.magentaBright('HTL HAS TLLLLL'), node.getKindName());
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


    private static addPropertiesAndUpdateParent(htl: HierarchicTypeLiteralNode): void {
        // if (htl.node instanceof TypeLiteralNode) {
            htl.interfaceInfo.properties = this.getProperties(htl.node);
        // }
    }


    private static getProperties(typeLiteral: TypeLiteralNode): Property[] {
        console.log(chalk.cyanBright('PROPSSSSS'), typeLiteral.getProperties().map(p => p.getName()));
        const properties: Property[] = [];
        for (const prop of typeLiteral.getProperties()) {
            const property: Property = {
                initializer:  prop.getInitializer(),
                isRequired: !prop.hasQuestionToken(),
                name: prop.getName(),
                type: declarationType(prop)
            }
            properties.push(property);
        }
        return properties;
    }

}
