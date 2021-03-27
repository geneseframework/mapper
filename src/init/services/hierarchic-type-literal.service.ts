import { HierarchicTypeLiteral, HierarchicTypeLiteralNode } from '../models/hierarchic-type-literal.model';
import { Node, SyntaxKind, TypeLiteralNode } from 'ts-morph';
import { getFirstTypeLiteralAncestor, hasTypeLiteral } from '../utils/ast/ast-type-literal.util';
import { TypeOrPropertyDeclaration } from '../types/type-declaration.type';
import { Property } from '../../shared/types/target/property.type';
import { declarationType } from '../utils/ast/ast-declaration.util';
import * as chalk from 'chalk';
import { Block, getBlocks } from '../../create/types/target/string/block.type';
import { getCurveBracketedBlocs } from '../../create/types/target/string/curve-bracketed.type';

export class HierarchicTypeLiteralService {

    static create(declaration: TypeOrPropertyDeclaration): HierarchicTypeLiteral {
        const htl = new HierarchicTypeLiteral(declaration, declaration, undefined);
        htl.children = this.createHTLChildren(declaration, htl);
        return htl;
    }


    private static createHTLChildren(root: TypeOrPropertyDeclaration, parent: HierarchicTypeLiteral): HierarchicTypeLiteral[] {
        const htls: HierarchicTypeLiteral[] = [];
        const ancestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(parent.node);
        for (let i = 0; i < ancestors.length; i++) {
            const htl = new HierarchicTypeLiteral(root, ancestors[i], parent, i);
            console.log(chalk.magentaBright('HTL HAS TLLLLL ????'), parent.node.getKindName(), this.isTrivialTypeLiteral(ancestors[i]));
            if (this.isTrivialTypeLiteral(ancestors[i])) {
                htl.isTrivial = true;
                this.addPropertiesAndUpdateParent(htl as HierarchicTypeLiteralNode);
            } else if (hasTypeLiteral(parent.node)) {
                console.log(chalk.magentaBright('HTL HAS TLLLLL'), parent.node.getKindName());
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
            htl.interfaceInfo.properties = this.getProperties(htl.node);
            this.updateParent(htl);
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


    private static updateParent(htl: HierarchicTypeLiteralNode): void {
        if (!htl.parent) {
            return;
        }
        htl.parent.stringifiedType = this.updateStringifiedType(htl.parent, htl);
    }


    private static updateStringifiedType(parent: HierarchicTypeLiteral, child: HierarchicTypeLiteralNode): string {
        console.log(chalk.redBright('UPDATE STTTTT parent.stringifiedType'), parent.stringifiedType);
        const blocks: Block[] = getCurveBracketedBlocs(parent.stringifiedType);
        console.log(chalk.redBright('UPDATE STTTTT blockkkkks'), blocks);
        return undefined;
    }

}
