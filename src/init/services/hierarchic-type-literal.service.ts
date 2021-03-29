import { HierarchicTypeLiteral, HierarchicTypeLiteralNode } from '../models/hierarchic-type-literal.model';
import { Node, PropertySignature, SyntaxKind, TypeAliasDeclaration, TypeLiteralNode } from 'ts-morph';
import { getFirstTypeLiteralAncestor, hasTypeLiteral } from '../utils/ast/ast-type-literal.util';
import { TypeOrPropertyDeclaration } from '../types/type-declaration.type';
import { Property } from '../../shared/types/target/property.type';
import { declarationType } from '../utils/ast/ast-declaration.util';
import * as chalk from 'chalk';
import { INIT } from '../const/init.const';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import {
    CurvedBracketed,
    CurvedBracketedBlockInfo,
    getCurvedBracketedBlockInfos, getPropertiesFromCurvedBracketed
} from '../../create/types/target/string/curve-bracketed.type';
import { sourceFilePath } from '../utils/ast/ast-sourcefile.util';
import { replaceBlocksByNames, textCorrespondsToProperties } from '../utils/property.util';
import { BlockInfo } from '../../create/types/target/string/block.type';
import { throwWarning } from '../../create/utils/errors.util';
import { removeBorders } from '../../shared/utils/strings.util';

export class HierarchicTypeLiteralService {

    // static create(declaration: TypeAliasDeclaration): TypeInfo
    // static create(declaration: PropertyDeclaration): InterfaceInfo
    static create(declaration: TypeOrPropertyDeclaration): InterfaceInfo {
        const interfaceInfo: InterfaceInfo = new InterfaceInfo(declaration.getName(), sourceFilePath(declaration));
        // static create(declaration: TypeOrPropertyDeclaration): DeclarationInfo {
        const blockInfos: BlockInfo[] = this.getBlockInfos(declaration);
        // const htl = new HierarchicTypeLiteral(declaration, declaration, undefined);
        console.log(chalk.yellowBright('FINAL BLOCK INFOOOOOO'), blockInfos);
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
            console.log(chalk.blueBright('GET BLINFOOOOO text typeLiteralNode'), typeLiteralAncestor.getText());
            const rootST = this.getOriginalStringifiedType(typeLiteralAncestor, declarationType(declaration));
            console.log(chalk.blueBright('GET BLINFOOOOO rootST'), rootST);
            const htl = new HierarchicTypeLiteral(typeLiteralAncestor, undefined, rootST);
            htl.name = `${declaration.getName()}Interface`;
            console.log(chalk.blueBright('GET BLINFOOOOO htl name & origin st'), htl.name, htl.originalStringifiedType);
            htl.children = this.createHTLChildren(htl);
            htl.interfaceInfo = this.createHTLInterfaceInfo(htl);
            console.log(chalk.blueBright('GET BLINFOOOOO htl name & origin st IIIIII'), htl.interfaceInfo);
            INIT.addDeclarationInfo(htl.interfaceInfo);
            blockInfos.push({name: htl.name, block: htl.originalStringifiedType});
            // for (const child of htl.children) {
            //     blockInfos.push({name: child.interfaceInfo.name, block: htl.originalStringifiedType});
            // }
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
        console.log(chalk.magentaBright('CREATE HTL CHILD parent ....'), parent.name, parent.originalStringifiedType);
        console.log(chalk.magentaBright('CREATE HTL CHILD parent typeLiteralNode txt....'), parent.typeLiteralNode.getText());
        const ancestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(parent.typeLiteralNode);
        for (let i = 0; i < ancestors.length; i++) {
            // const originalStringifiedType: CurvedBracketed = '{zzz: zzz}'
            console.log(chalk.magentaBright('CREATE HTL CHILD ANCESTOR TEXTTTTT ....'), ancestors[i].getText());
            const originalStringifiedType: CurvedBracketed = this.getOriginalStringifiedType(ancestors[i], removeBorders(parent.originalStringifiedType));
            console.log(chalk.magentaBright('CREATE HTL CHILD originalStringifiedType ....'), originalStringifiedType);
            const htl = new HierarchicTypeLiteral(ancestors[i], parent, originalStringifiedType, i);
            htl.setName(parent.name);
            console.log(chalk.magentaBright('IS TRIVIALL ????'), htl.name, this.isTrivialTypeLiteral(ancestors[i]));
            htl.interfaceInfo = this.createHTLInterfaceInfo(htl);
            console.log(chalk.magentaBright('HTL CHILD....'), htl.interfaceInfo);
            if (this.isTrivialTypeLiteral(ancestors[i])) {
                htl.isTrivial = true;
                console.log(chalk.yellowBright('HTL HAS TLLLLL parent kind'), htl.name);
                this.addPropertiesAndUpdateParent(htl as HierarchicTypeLiteralNode);
                // TODO: htl.nameeeee
            } else if (hasTypeLiteral(parent.typeLiteralNode)) {
                console.log(chalk.yellowBright('HTL HAS TLLLLL parent kind'), parent.typeLiteralNode.getKindName());
                console.log(chalk.yellowBright('HTL HAS TLLLLL parent II'), parent.interfaceInfo);
                // const props: PropertyDeclarationOrSignature[] = parent.typeLiteralNode instanceof TypeLiteralNode ? parent.typeLiteralNode.getMembers() : parent.typeLiteralNode instanceof PropertyDeclaration ? parent.typeLiteralNode : parent.typeLiteralNode.getProperties();
                // for (const propertyDeclaration of parent.typeLiteralNode.getProperties())
                // const propertyDeclaration: PropertyDeclaration =
                htl.children = this.createHTLChildren(htl);
                this.updateInterfaceInfo(htl);
                console.log(chalk.yellowBright('HTL htl.children'), htl.children);
                throw 'ZZZZ'
            }
            console.log(chalk.blueBright('ZZZZZZZZZZ'), );
            htls.push(htl);
        }
        return htls;
    }


    // TODO
    private static getOriginalStringifiedType(typeLiteralNode: TypeLiteralNode, parentStringifiedType: string): CurvedBracketed {
        // console.log(chalk.greenBright('TEXT CORRESPONDS TO PROPSSSS typeLiteralNode text'), typeLiteralNode.getText());
        // console.log(chalk.greenBright('TEXT CORRESPONDS TO PROPSSSS parentStringifiedType'), parentStringifiedType);
        const blockInfos: CurvedBracketedBlockInfo[] = getCurvedBracketedBlockInfos(parentStringifiedType);
        // console.log(chalk.greenBright('TEXT CORRESPONDS TO PROPSSSS blockInfos'), blockInfos);
        for (const blockInfo of blockInfos) {
            if (textCorrespondsToProperties(blockInfo.block, this.getProperties(typeLiteralNode))) {
                console.log(chalk.greenBright('TEXT CORRESPONDS TO PROPSSSS bi'), blockInfo);
                return blockInfo.block;
            }
        }
        throwWarning(`property signature not found in ${parentStringifiedType}`);
    }


    private static createHTLInterfaceInfo(htl: HierarchicTypeLiteral): InterfaceInfo {
        const interfaceInfo = new InterfaceInfo(htl.name, sourceFilePath(htl.typeLiteralNode));
        interfaceInfo.properties = getPropertiesFromCurvedBracketed(htl.originalStringifiedType);
        console.log(chalk.blueBright('CREATE HTL IIIIIII'), interfaceInfo);
        // TODO:
        // replace blocks for each property
        return interfaceInfo;
    }


    // private static createHTLChildren(root: TypeOrPropertyDeclaration, parent: HierarchicTypeLiteral): HierarchicTypeLiteral[] {
    //     const htls: HierarchicTypeLiteral[] = [];
    //     console.log(chalk.magentaBright('CREATE HTL CHILD parent kind....'), parent.typeLiteralNode.getKindName());
    //     const ancestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(parent.typeLiteralNode);
    //     for (let i = 0; i < ancestors.length; i++) {
    //         const htl = new HierarchicTypeLiteral(root, ancestors[i], parent, i);
    //         console.log(chalk.magentaBright('HTL HAS TLLLLL ????'), parent.typeLiteralNode.getKindName(), this.isTrivialTypeLiteral(ancestors[i]));
    //         console.log(chalk.magentaBright('HTL CHILD....'), htl.interfaceInfo);
    //         if (this.isTrivialTypeLiteral(ancestors[i])) {
    //             htl.isTrivial = true;
    //             this.addPropertiesAndUpdateParent(htl as HierarchicTypeLiteralNode);
    //         } else if (hasTypeLiteral(parent.typeLiteralNode)) {
    //             console.log(chalk.yellowBright('HTL HAS TLLLLL parent kind'), parent.typeLiteralNode.getKindName());
    //             console.log(chalk.yellowBright('HTL HAS TLLLLL parent II'), parent.interfaceInfo);
    //             const props: PropertyDeclarationOrSignature[] = parent.typeLiteralNode instanceof TypeLiteralNode ? parent.typeLiteralNode.getMembers() : parent.typeLiteralNode instanceof PropertyDeclaration ? parent.typeLiteralNode : parent.typeLiteralNode.getProperties();
    //             // for (const propertyDeclaration of parent.typeLiteralNode.getProperties())
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
        console.log(chalk.greenBright('GET TL ANCESTORSSSSS'), node.getText(), node.getKindName(), node.getDescendantsOfKind(SyntaxKind.TypeLiteral).length);
        for (const typeLiteralNode of node.getDescendantsOfKind(SyntaxKind.TypeLiteral)) {
            if (this.isTypeLiteralAncestorInRootNode(typeLiteralNode, node)) {
                console.log(chalk.greenBright('GET TL ANCESTORSSSSS TL NODE'), typeLiteralNode.getText());
                typeLiteralNodes.push(typeLiteralNode)
            }
        }
        return typeLiteralNodes;
    }


    private static isTypeLiteralAncestorInRootNode(typeLiteralNode: TypeLiteralNode, root: Node): boolean {
        const ancestor: TypeLiteralNode = getFirstTypeLiteralAncestor(typeLiteralNode);
        // console.log(chalk.redBright('ISTL ANCESTORRRR???'), typeLiteralNode.getText(), root.getText());
        // console.log(chalk.redBright('ISTL ANCESTORRRR??? ancestor txt'), ancestor?.getText());
        // console.log(chalk.redBright('ISTL ANCESTORRRR??? ancestor === root ?'), ancestor?.getKindName(), root.getKindName());
        console.log(chalk.redBright('ISTL ANCESTORRRR???'), typeLiteralNode.getText(), !ancestor || ancestor === root);
        return !ancestor || ancestor === root;
    }


    private static addPropertiesAndUpdateParent(htl: HierarchicTypeLiteralNode): void {
        htl.interfaceInfo.properties = this.getProperties(htl.typeLiteralNode);
        INIT.addDeclarationInfo(htl.interfaceInfo);
        // this.updateParent(htl);
    }


    static getProperties(typeLiteral: TypeLiteralNode): Property[] {
        // console.log(chalk.cyanBright('PROPSSSSS'), typeLiteral.getProperties().map(p => p.getName()));
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
        // console.log(chalk.cyanBright('PROPSSSSS END'), properties);
        return properties;
    }


    private static updateInterfaceInfo(htl: HierarchicTypeLiteral): void {
        for (const child of htl.children) {
            this.updateParent(child, htl);
        }
    }


    private static updateParent(child: HierarchicTypeLiteral, parent: HierarchicTypeLiteral): void {
        console.log(chalk.redBright('UPDATEEEEE PARENT props'), parent.interfaceInfo.properties);
        const blockInfo: BlockInfo = {block: child.originalStringifiedType, name: child.interfaceInfo.name};
        console.log(chalk.redBright('UPDATEEEEE PARENT bi'), blockInfo);
        for (const property of parent.interfaceInfo.properties) {
            property.type = replaceBlocksByNames(property.type, [blockInfo]);
        }
        console.log(chalk.redBright('UPDATEEEEEDD PARENT props'), parent.interfaceInfo.properties);
        // htl.parent.newStringifiedType = replaceBlocksByNames(htl.parent.originalStringifiedType, [blockInfo]);
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
