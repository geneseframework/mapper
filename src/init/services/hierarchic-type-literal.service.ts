import { HierarchicTypeLiteral } from '../models/hierarchic-type-literal.model';
import { Node, SyntaxKind, TypeAliasDeclaration, TypeLiteralNode } from 'ts-morph';
import { getFirstTypeLiteralAncestor } from '../utils/ast/ast-type-literal.util';
import { TypeOrPropertyDeclarationOrSignature } from '../types/type-declaration.type';
import { Property } from '../../shared/models/property.model';
import { declarationType } from '../utils/ast/ast-declaration.util';
import { INIT } from '../const/init.const';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import {
    CurvedBracketed,
    CurvedBracketedBlockInfo,
    getCurvedBracketedBlockInfos,
    getIndexableTypeFromCurvedBracketed,
    getPropertiesFromCurvedBracketed
} from '../../create/types/containers/curve-bracketed.type';
import { sourceFilePath } from '../utils/ast/ast-sourcefile.util';
import { BlockInfo } from '../../create/types/containers/block.type';
import { replaceBlocksByNames, textCorrespondsToProperties } from '../utils/property.util';
import { ClassOrInterfaceDeclaration } from '../types/class-or-interface-declaration.type';
import { removeBorders, throwWarning } from '@genese/core';

/**
 * Creates the Hierarchic Type Literals (HTL) which will be used to generate the InterfaceInfos corresponding to the blocks surrounded by curved brackets in the stringified type of a TypeAliasDeclaration
 * - Find recursively the curved bracketed blocks inside stringified type (finds the biggest blocks and creates HTLs children corresponding to the nested curved bracketed blocks)
 * - Creates new InterfaceInfos for each HTL (parents and children)
 * - Replaces recursively the curved bracketed blocks by their corresponding InterfaceInfo name
 * - Updates the stringified type of the TypeAliasDeclaration or PropertyDeclaration of a class or interface
 * More details in the corresponding diagram in ./docs/diagrams.mdj (StarUML file)
 */
export class HierarchicTypeLiteralService {

    /**
     * Creates the InterfaceInfo corresponding to the stringified type of a TypeAliasDeclaration or to the PropertyDeclaration of a class or interface property
     * More details on the description of the service above
     * @param declaration       // The declaration with the stringified type including texts surrounded by curved brackets
     */
    static create(declaration: TypeOrPropertyDeclarationOrSignature): InterfaceInfo {
        const interfaceInfo: InterfaceInfo = new InterfaceInfo(declaration.getName(), sourceFilePath(declaration));
        const blockInfos: BlockInfo[] = this.getBlockInfos(declaration);
        interfaceInfo.stringifiedType = replaceBlocksByNames(declarationType(declaration), blockInfos);
        return interfaceInfo;
    }

    /**
     * Returns the info about curved bracketed blocks of the stringified type of the TypeAliasDeclaration or the PropertyDeclaration
     * @param declaration       // The declaration with the stringified type including texts surrounded by curved brackets
     * @private
     */
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

    /**
     * Returns the name of the InterfaceInfo which will be used to construct the names of the HTL children and their corresponding InterfaceInfo
     * @param declaration       // The declaration with the stringified type including texts surrounded by curved brackets
     * @private
     */
    private static getInterfaceInfoName(declaration: TypeOrPropertyDeclarationOrSignature): string {
        if (declaration instanceof TypeAliasDeclaration) {
            return `${declaration.getName()}Interface`;
        } else {
            const parentDeclaration: ClassOrInterfaceDeclaration = declaration.getParent() as ClassOrInterfaceDeclaration;
            return `${parentDeclaration.getName()}Interface`;
        }
    }

    /**
     * Returns the children of a given HTL (corresponding to the nested curved bracketed blocks nested in the stringified type of the HTL parent)
     * @param parent        // The HTL parent
     * @private
     */
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
                this.addPropertiesAndAddInterfaceInfoToTheDeclarationInfosArray(htl);
                // TODO: remove this line when replaceBlocksByInterfaceInfoNames() will be implemented
                this.replaceBlocksByInterfaceInfoNameInHTLParent(htl, parent);
            } else {
                this.createHTLChildren(htl);
            }
            htls.push(htl);
        }
        return htls;
    }

    /**
     * Returns the curved bracketed block corresponding to a TypeLiteral node in the stringified type of the HTL parent
     * @param typeLiteralNode           // The TypeLiteral node to analyze
     * @param parentStringifiedType     // The text of its HTL parent
     * @private
     */
    private static getOriginalStringifiedType(typeLiteralNode: TypeLiteralNode, parentStringifiedType: string): CurvedBracketed {
        const blockInfos: CurvedBracketedBlockInfo[] = getCurvedBracketedBlockInfos(parentStringifiedType);
        const typeLiteralProperties: Property[] = this.getTypeLiteralClassicProperties(typeLiteralNode);
        for (const blockInfo of blockInfos) {
            if (textCorrespondsToProperties(blockInfo.block, typeLiteralProperties)) {
                return blockInfo.block;
            }
        }
        throwWarning(`property signature not found for '${typeLiteralNode?.getText()}' in '${parentStringifiedType}'`);
    }

    /**
     * Returns the InterfaceInfo corresponding to a given HTL
     * @param htl       // The HTL to analyze
     * @private
     */
    private static createHTLInterfaceInfo(htl: HierarchicTypeLiteral): InterfaceInfo {
        const interfaceInfo = new InterfaceInfo(htl.name, sourceFilePath(htl.typeLiteralNode));
        interfaceInfo.properties = getPropertiesFromCurvedBracketed(htl.originalStringifiedType);
        interfaceInfo.indexableType = getIndexableTypeFromCurvedBracketed(htl.originalStringifiedType);
        return interfaceInfo;
    }

    /**
     * Checks if a TypeLiteral node has TypeLiteral node children
     * @param typeLiteralNode   // The TypeLiteral node to analyze
     * @private
     */
    private static isTrivialTypeLiteral(typeLiteralNode: TypeLiteralNode): boolean {
        return !typeLiteralNode.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
    }

    /**
     * Returns the TypeLiteral nodes which are the ancestors of a given Node
     * @param node      // The node to analyze
     * @private
     */
    private static getTypeLiteralAncestors(node: Node): TypeLiteralNode[] {
        const typeLiteralNodes: TypeLiteralNode[] = [];
        for (const typeLiteralNode of node.getDescendantsOfKind(SyntaxKind.TypeLiteral)) {
            if (this.isTypeLiteralAncestorInRootNode(typeLiteralNode, node)) {
                typeLiteralNodes.push(typeLiteralNode)
            }
        }
        return typeLiteralNodes;
    }

    /**
     * Checks if a TypeLiteral Node is a child of root Node
     * @param typeLiteralNode
     * @param root
     * @private
     */
    private static isTypeLiteralAncestorInRootNode(typeLiteralNode: TypeLiteralNode, root: Node): boolean {
        const ancestor: TypeLiteralNode = getFirstTypeLiteralAncestor(typeLiteralNode);
        return !ancestor || ancestor === root;
    }

    /**
     * - Adds properties to the InterfaceInfo corresponding to a given HTL
     * - Push this InterfaceInfo to the array of DeclarationInfo in the generated declaration-info.js file
     * @param htl       // The HTL to analyze
     * @private
     */
    private static addPropertiesAndAddInterfaceInfoToTheDeclarationInfosArray(htl: HierarchicTypeLiteral): void {
        htl.interfaceInfo.properties = this.getTypeLiteralClassicProperties(htl.typeLiteralNode);
        INIT.addDeclarationInfo(htl.interfaceInfo);
    }

    /**
     * Returns the array of Property corresponding to the 'classic' properties of a given TypeLiteral Node (ie: the properties which are not indexable types)
     * @param typeLiteral
     */
    static getTypeLiteralClassicProperties(typeLiteral: TypeLiteralNode): Property[] {
        const properties: Property[] = [];
        for (const prop of typeLiteral.getProperties()) {
            const property: Property = new Property(prop.getName(), declarationType(prop), prop.getInitializer(), !prop.hasQuestionToken());
                // initializer:  prop.getInitializer(),
                // hasQuestionToken: !prop.hasQuestionToken(),
                // name: prop.getName(),
                // stringifiedType: declarationType(prop)
            // }
            properties.push(property);
        }
        return properties;
    }

    /**
     * Replaces a curved bracketed block in HTL parent with the name of the InterfaceInfo of one of its HTL children
     * @param child     // The HTL child
     * @param parent    // The HTL parent
     * @private
     */
    private static replaceBlocksByInterfaceInfoNameInHTLParent(child: HierarchicTypeLiteral, parent: HierarchicTypeLiteral): void {
        const blockInfo: BlockInfo = {block: child.originalStringifiedType, name: child.interfaceInfo.name};
        for (const property of parent.interfaceInfo.properties) {
            property.stringifiedType = replaceBlocksByNames(property.stringifiedType, [blockInfo]);
        }
    }

    /**
     * Recursive method replacing curved bracketed blocks by their corresponding InterfaceInfo name for a given HTL
     * @param htl       // The HTL to update
     * @private
     */
    private static replaceBlocksByInterfaceInfoNames(htl: HierarchicTypeLiteral): void {
        // TODO: get HTLs with trivial children
        // TODO: foreach of them, replace block by II name
        // TODO: set isTrivial to true
        // TODO: loop until all are trivial
    }
}
