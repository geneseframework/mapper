import { HierarchicTypeLiteral, HierarchicTypeLiteralNode } from '../models/hierarchic-type-literal.model';
import { Node, PropertyDeclaration, SyntaxKind, TypeAliasDeclaration, TypeLiteralNode } from 'ts-morph';
import { getFirstTypeLiteralAncestor, hasTypeLiteral } from '../utils/ast/ast-type-literal.util';
import { TypeOrPropertyDeclaration } from '../types/type-declaration.type';
import { Property } from '../../shared/types/target/property.type';
import { declarationType } from '../utils/ast/ast-declaration.util';
import * as chalk from 'chalk';
import { INIT } from '../const/init.const';
import { replaceAll } from '../../shared/utils/strings.util';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import {
    CurvedBracketed,
    CurvedBracketedBlockInfo,
    getCurvedBracketedBlockInfos
} from '../../create/types/target/string/curve-bracketed.type';
import { PropertyDeclarationOrSignature } from '../types/property-declaration-or-signature.type';
import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';
import { TypeInfo } from '../../shared/models/declarations/type-info.model';
import { sourceFilePath } from '../utils/ast/ast-sourcefile.util';
import { replaceBlocksByNames, textCorrespondsToProperties } from '../utils/property.util';
import { BlockInfo } from '../../create/types/target/string/block.type';

export class HierarchicTypeLiteralService {

    // static create(declaration: TypeAliasDeclaration): TypeInfo
    // static create(declaration: PropertyDeclaration): InterfaceInfo
    static create(declaration: TypeOrPropertyDeclaration): InterfaceInfo {
        const interfaceInfo: InterfaceInfo = new InterfaceInfo(declaration.getName(), sourceFilePath(declaration));
        // static create(declaration: TypeOrPropertyDeclaration): DeclarationInfo {
        const blockInfos: BlockInfo[] = this.getBlockInfos(declaration);
        // const htl = new HierarchicTypeLiteral(declaration, declaration, undefined);
        if (declaration instanceof TypeAliasDeclaration) {
            interfaceInfo.stringifiedType = replaceBlocksByNames(declarationType(declaration), blockInfos);
        }
        console.log(chalk.yellowBright('HTL CREATE....'), interfaceInfo);
        return interfaceInfo;
    }


    private static getBlockInfos(declaration: TypeOrPropertyDeclaration): BlockInfo[] {
        const typeLiteralAncestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(declaration);
        const blockInfos: BlockInfo[] = [];
        for (const typeLiteralAncestor of typeLiteralAncestors) {
            const htl = new HierarchicTypeLiteral(typeLiteralAncestor, undefined, declarationType(declaration));
            htl.children = this.createHTLChildren(htl);
            blockInfos.push({name: htl.name, block: htl.originalStringifiedType});
        }
        return blockInfos;
    }

    // static create(declaration: TypeOrPropertyDeclaration): HierarchicTypeLiteral {
    //     const htl = new HierarchicTypeLiteral(declaration, declaration, undefined);
    //     console.log(chalk.yellowBright('HTL ROOT....'), htl.interfaceInfo);
    //     htl.children = this.createHTLChildren(declaration, htl);
    //     return htl;
    // }


    private static createHTLChildren(parent: HierarchicTypeLiteral): HierarchicTypeLiteral[] {
        const htls: HierarchicTypeLiteral[] = [];
        console.log(chalk.magentaBright('CREATE HTL CHILD parent kind....'), parent.node.getKindName());
        const ancestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(parent.node);
        for (let i = 0; i < ancestors.length; i++) {
            const originalStringifiedType: string = this.getOriginalStringifiedType(ancestors[i], parent.originalStringifiedType);
            const htl = new HierarchicTypeLiteral(ancestors[i], parent, originalStringifiedType, i);
            console.log(chalk.magentaBright('HTL HAS TLLLLL ????'), parent.node.getKindName(), this.isTrivialTypeLiteral(ancestors[i]));
            console.log(chalk.magentaBright('HTL CHILD....'), htl.interfaceInfo);
            if (this.isTrivialTypeLiteral(ancestors[i])) {
                htl.isTrivial = true;
                this.addPropertiesAndUpdateParent(htl as HierarchicTypeLiteralNode);
            } else if (hasTypeLiteral(parent.node)) {
                console.log(chalk.yellowBright('HTL HAS TLLLLL parent kind'), parent.node.getKindName());
                console.log(chalk.yellowBright('HTL HAS TLLLLL parent II'), parent.interfaceInfo);
                // const props: PropertyDeclarationOrSignature[] = parent.node instanceof TypeLiteralNode ? parent.node.getMembers() : parent.node instanceof PropertyDeclaration ? parent.node : parent.node.getProperties();
                // for (const propertyDeclaration of parent.node.getProperties())
                // const propertyDeclaration: PropertyDeclaration =
                htl.children = this.createHTLChildren(htl);
                console.log(chalk.yellowBright('HTL htl.children'), htl.children);
                throw 'ZZZZ'
            }
            htls.push(htl);
        }
        return htls;
    }


    private static getOriginalStringifiedType(typeLiteralNode: TypeLiteralNode, parentStringifiedType: string): CurvedBracketed {
        const blockInfos: CurvedBracketedBlockInfo[] = getCurvedBracketedBlockInfos(parentStringifiedType);
        for (const blockInfo of blockInfos) {
            if (parentStringifiedType.includes(blockInfo.block)) {
                return blockInfo.block;
            }
        }
    }


    // private static createHTLChildren(root: TypeOrPropertyDeclaration, parent: HierarchicTypeLiteral): HierarchicTypeLiteral[] {
    //     const htls: HierarchicTypeLiteral[] = [];
    //     console.log(chalk.magentaBright('CREATE HTL CHILD parent kind....'), parent.node.getKindName());
    //     const ancestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(parent.node);
    //     for (let i = 0; i < ancestors.length; i++) {
    //         const htl = new HierarchicTypeLiteral(root, ancestors[i], parent, i);
    //         console.log(chalk.magentaBright('HTL HAS TLLLLL ????'), parent.node.getKindName(), this.isTrivialTypeLiteral(ancestors[i]));
    //         console.log(chalk.magentaBright('HTL CHILD....'), htl.interfaceInfo);
    //         if (this.isTrivialTypeLiteral(ancestors[i])) {
    //             htl.isTrivial = true;
    //             this.addPropertiesAndUpdateParent(htl as HierarchicTypeLiteralNode);
    //         } else if (hasTypeLiteral(parent.node)) {
    //             console.log(chalk.yellowBright('HTL HAS TLLLLL parent kind'), parent.node.getKindName());
    //             console.log(chalk.yellowBright('HTL HAS TLLLLL parent II'), parent.interfaceInfo);
    //             const props: PropertyDeclarationOrSignature[] = parent.node instanceof TypeLiteralNode ? parent.node.getMembers() : parent.node instanceof PropertyDeclaration ? parent.node : parent.node.getProperties();
    //             // for (const propertyDeclaration of parent.node.getProperties())
    //             // const propertyDeclaration: PropertyDeclaration =
    //             htl.children = this.createHTLChildren(root, htl);
    //             console.log(chalk.yellowBright('HTL htl.children'), htl.children);
    //             throw 'ZZZZ'
    //         }
    //         htls.push(htl);
    //     }
    //     return htls;
    // }


    private static isTrivialTypeLiteral(typeLiteralNode: TypeLiteralNode): boolean {
        return !typeLiteralNode.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
    }


    private static getTypeLiteralAncestors(node: Node): TypeLiteralNode[] {
        const typeLiteralNodes: TypeLiteralNode[] = [];
        console.log(chalk.greenBright('GET TL ANCESTORSSSSS'), node.getKindName(), node.getDescendantsOfKind(SyntaxKind.TypeLiteral).length);
        for (const typeLiteralNode of node.getDescendantsOfKind(SyntaxKind.TypeLiteral)) {
            if (this.isTypeLiteralAncestorInRootNode(typeLiteralNode, node)) {
                typeLiteralNodes.push(typeLiteralNode)
            }
        }
        console.log(chalk.greenBright('GET TL ANCESTORSSSSS TL NODES'), typeLiteralNodes.length);
        return typeLiteralNodes;
    }


    private static isTypeLiteralAncestorInRootNode(typeLiteralNode: TypeLiteralNode, root: Node): boolean {
        const ancestor: TypeLiteralNode = getFirstTypeLiteralAncestor(typeLiteralNode);
        return !ancestor || ancestor !== getFirstTypeLiteralAncestor(root);
    }


    private static addPropertiesAndUpdateParent(htl: HierarchicTypeLiteralNode): void {
        htl.interfaceInfo.properties = this.getProperties(htl.node);
        INIT.addDeclarationInfo(htl.interfaceInfo);
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
        // if (htl.parent.isRoot) {
        const blockInfo: BlockInfo = {block: htl.originalStringifiedType, name: htl.name};
            console.log(chalk.redBright('UPDATEEEEE PARENT bi'), blockInfo);
            htl.parent.newStringifiedType = replaceBlocksByNames(htl.parent.originalStringifiedType, [blockInfo]);
        // } else {
            // TODO
            // console.log(chalk.redBright('UPDATE PARENTTTT parent II'), htl.parent.interfaceInfo);
        // }
        // console.log(chalk.cyanBright('HTL IIIIII'), htl.interfaceInfo);
        // const correspondingProperties: Property[] = htl.parent.interfaceInfo.properties.filter(p => htl.interfaceInfo.correspondsTo(p.stringifiedType));
        // console.log(chalk.cyanBright('CORR PROPSSSS'), correspondingProperties);
    }

    // TODO
    // private static replaceCurvedBracketsByInterfaceInfoName(text: string, interfaceInfo: InterfaceInfo): string {
    //     console.log(chalk.magentaBright('REPLACE CBSSSSS'), text, interfaceInfo);
    //     const blockInfos: CurvedBracketedBlockInfo[] = getCurvedBracketedBlockInfos(text);
    //     console.log(chalk.magentaBright('BLOKKKKKK'), blockInfos);
    //     // TODO: find if blocks correspond to ii props
    //     for (const block of blockInfos.map(b => b.block)) {
    //         if (interfaceInfo.correspondsTo(block)) {
    //             text = replaceAll(text, block, interfaceInfo.name);
    //         }
    //     }
    //     console.log(chalk.magentaBright('TEXT UPDATEDDDD'), text);
    //     return text;
    // }


    // private static areEquivalent(block: CurvedBracketed, properties: Property[]): boolean {
    //     return false;
    // }

}
