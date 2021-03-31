import { HierarchicTypeLiteral, HierarchicTypeLiteralNode } from '../models/hierarchic-type-literal.model';
import { Node, SyntaxKind, TypeAliasDeclaration, TypeLiteralNode } from 'ts-morph';
import { getFirstTypeLiteralAncestor } from '../utils/ast/ast-type-literal.util';
import { TypeOrPropertyDeclarationOrSignature } from '../types/type-declaration.type';
import { Property } from '../../shared/types/target/property.type';
import { declarationType } from '../utils/ast/ast-declaration.util';
import { INIT } from '../const/init.const';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import {
    CurvedBracketed,
    CurvedBracketedBlockInfo,
    getCurvedBracketedBlockInfos,
    getIndexableTypeFromCurvedBracketed,
    getPropertiesFromCurvedBracketed
} from '../../create/types/target/string/curve-bracketed.type';
import { sourceFilePath } from '../utils/ast/ast-sourcefile.util';
import { BlockInfo } from '../../create/types/target/string/block.type';
import { throwWarning } from '../../shared/core/utils/functions/errors.util';
import { removeBorders } from '../../shared/utils/strings.util';
import { replaceBlocksByNames, textCorrespondsToProperties } from '../utils/property.util';
import { ClassOrInterfaceDeclaration } from '../types/class-or-interface-declaration.type';
import * as chalk from 'chalk';

export class HierarchicTypeLiteralService {

    static create(declaration: TypeOrPropertyDeclarationOrSignature): InterfaceInfo {
        const interfaceInfo: InterfaceInfo = new InterfaceInfo(declaration.getName(), sourceFilePath(declaration));
        const blockInfos: BlockInfo[] = this.getBlockInfos(declaration);
        interfaceInfo.stringifiedType = replaceBlocksByNames(declarationType(declaration), blockInfos);
        return interfaceInfo;
    }


    private static getInterfaceInfoName(declaration: TypeOrPropertyDeclarationOrSignature): string {
        if (declaration instanceof TypeAliasDeclaration) {
            return `${declaration.getName()}Interface`;
        } else {
            const parentDeclaration: ClassOrInterfaceDeclaration = declaration.getParent() as ClassOrInterfaceDeclaration;
            return `${parentDeclaration.getName()}Interface`;
        }
    }


    private static getBlockInfos(declaration: TypeOrPropertyDeclarationOrSignature): BlockInfo[] {
        const typeLiteralAncestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(declaration);
        const blockInfos: BlockInfo[] = [];
        for (const typeLiteralAncestor of typeLiteralAncestors) {
            const stringifiedType: CurvedBracketed = this.getOriginalStringifiedType(typeLiteralAncestor, declarationType(declaration));
            const htl = new HierarchicTypeLiteral(typeLiteralAncestor, undefined, stringifiedType);
            htl.name = this.getInterfaceInfoName(declaration);
            htl.interfaceInfo = this.createHTLInterfaceInfo(htl);
            htl.children = this.createHTLChildren(htl);
            this.replaceBlocksByInterfaceInfoNames(htl);
            INIT.addDeclarationInfo(htl.interfaceInfo);
            blockInfos.push({name: htl.name, block: htl.originalStringifiedType});
        }
        return blockInfos;
    }


    private static createHTLChildren(parent: HierarchicTypeLiteral): HierarchicTypeLiteral[] {
        const htls: HierarchicTypeLiteral[] = [];
        const ancestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(parent.typeLiteralNode);
        for (let i = 0; i < ancestors.length; i++) {
            const originalStringifiedType: CurvedBracketed = this.getOriginalStringifiedType(ancestors[i], removeBorders(parent.originalStringifiedType));
            const htl = new HierarchicTypeLiteral(ancestors[i], parent, originalStringifiedType, i);
            htl.setName(parent.name);
            htl.interfaceInfo = this.createHTLInterfaceInfo(htl);
            if (this.isTrivialTypeLiteral(ancestors[i])) {
                htl.isTrivial = true;
                this.addProperties(htl as HierarchicTypeLiteralNode);
                // TODO: remove this line when replaceBlocksByInterfaceInfoNames() will be implemented
                this.replaceBlocksByInterfaceInfoNameInHTLParent(htl, parent);
            } else {
                this.createHTLChildren(htl);
            }
            htls.push(htl);
        }
        return htls;
    }


    private static getOriginalStringifiedType(typeLiteralNode: TypeLiteralNode, parentStringifiedType: string): CurvedBracketed {
        const blockInfos: CurvedBracketedBlockInfo[] = getCurvedBracketedBlockInfos(parentStringifiedType);
        const typeLiteralProperties: Property[] = this.getTypeLiteralProperties(typeLiteralNode);
        for (const blockInfo of blockInfos) {
            if (textCorrespondsToProperties(blockInfo.block, typeLiteralProperties)) {
                return blockInfo.block;
            }
        }
        throwWarning(`property signature not found in ${parentStringifiedType}`);
    }


    private static createHTLInterfaceInfo(htl: HierarchicTypeLiteral): InterfaceInfo {
        const interfaceInfo = new InterfaceInfo(htl.name, sourceFilePath(htl.typeLiteralNode));
        interfaceInfo.properties = getPropertiesFromCurvedBracketed(htl.originalStringifiedType);
        interfaceInfo.indexableType = getIndexableTypeFromCurvedBracketed(htl.originalStringifiedType);
        return interfaceInfo;
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
        return !ancestor || ancestor === root;
    }


    private static addProperties(htl: HierarchicTypeLiteralNode): void {
        htl.interfaceInfo.properties = this.getTypeLiteralProperties(htl.typeLiteralNode);
        INIT.addDeclarationInfo(htl.interfaceInfo);
    }


    static getTypeLiteralProperties(typeLiteral: TypeLiteralNode): Property[] {
        return this.getClassicProperties(typeLiteral);
    }


    private static getClassicProperties(typeLiteral: TypeLiteralNode): Property[] {
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


    private static replaceBlocksByInterfaceInfoNameInHTLParent(child: HierarchicTypeLiteral, parent: HierarchicTypeLiteral): void {
        const blockInfo: BlockInfo = {block: child.originalStringifiedType, name: child.interfaceInfo.name};
        for (const property of parent.interfaceInfo.properties) {
            property.type = replaceBlocksByNames(property.type, [blockInfo]);
        }
    }

    private static replaceBlocksByInterfaceInfoNames(htl: HierarchicTypeLiteral): void {
        // TODO: get HTLs with trivial children
        // TODO: foreach of them, replace block by II name
        // TODO: set isTrivial to true
        // TODO: loop until all are trivial
    }
}
