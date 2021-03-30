import { HierarchicTypeLiteral, HierarchicTypeLiteralNode } from '../models/hierarchic-type-literal.model';
import {
    IndexSignatureDeclarationStructure,
    Node,
    PropertySignature,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeLiteralNode
} from 'ts-morph';
import { getFirstTypeLiteralAncestor } from '../utils/ast/ast-type-literal.util';
import { TypeOrPropertyDeclaration, TypeOrPropertyDeclarationOrSignature } from '../types/type-declaration.type';
import { Property } from '../../shared/types/target/property.type';
import { declarationType } from '../utils/ast/ast-declaration.util';
import { INIT } from '../const/init.const';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import {
    CurvedBracketed,
    CurvedBracketedBlockInfo,
    getCurvedBracketedBlockInfos,
    getPropertiesFromCurvedBracketed
} from '../../create/types/target/string/curve-bracketed.type';
import { sourceFilePath } from '../utils/ast/ast-sourcefile.util';
import { BlockInfo } from '../../create/types/target/string/block.type';
import { throwWarning } from '../../create/utils/errors.util';
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
            // console.log(chalk.blueBright(`DECLA TIIIIP |${declarationType(declaration)}|`));
            const rootST = this.getOriginalStringifiedType(typeLiteralAncestor, declarationType(declaration));
            // console.log(chalk.blueBright('GET BLINFOOOOO rootST'), rootST);
            const htl = new HierarchicTypeLiteral(typeLiteralAncestor, undefined, rootST);
            htl.name = this.getInterfaceInfoName(declaration);
            // console.log(chalk.blueBright('GET BLINFOOOOO htl name & origin st'), htl.name, htl.originalStringifiedType);
            htl.interfaceInfo = this.createHTLInterfaceInfo(htl);
            htl.children = this.createHTLChildren(htl);
            INIT.addDeclarationInfo(htl.interfaceInfo);
            blockInfos.push({name: htl.name, block: htl.originalStringifiedType});
        }
        return blockInfos;
    }


    private static createHTLChildren(parent: HierarchicTypeLiteral): HierarchicTypeLiteral[] {
        const htls: HierarchicTypeLiteral[] = [];
        // console.log(chalk.magentaBright('CREATE HTL CHILD parent ....'), parent.name, parent.originalStringifiedType);
        const ancestors: TypeLiteralNode[] = this.getTypeLiteralAncestors(parent.typeLiteralNode);
        for (let i = 0; i < ancestors.length; i++) {
            const originalStringifiedType: CurvedBracketed = this.getOriginalStringifiedType(ancestors[i], removeBorders(parent.originalStringifiedType));
            const htl = new HierarchicTypeLiteral(ancestors[i], parent, originalStringifiedType, i);
            htl.setName(parent.name);
            // console.log(chalk.magentaBright('IS TRIVIALL ????'), htl.name, this.isTrivialTypeLiteral(ancestors[i]));
            htl.interfaceInfo = this.createHTLInterfaceInfo(htl);
            // console.log(chalk.magentaBright('HTL CHILD....'), htl.interfaceInfo);
            if (this.isTrivialTypeLiteral(ancestors[i])) {
                htl.isTrivial = true;
                this.addProperties(htl as HierarchicTypeLiteralNode);
                this.updateParent(htl, parent);
            } else {
                this.updateInterfaceInfo(htl);
                // TODO: update parent ?
            }
            htls.push(htl);
        }
        return htls;
    }


    private static getOriginalStringifiedType(typeLiteralNode: TypeLiteralNode, parentStringifiedType: string): CurvedBracketed {
        const blockInfos: CurvedBracketedBlockInfo[] = getCurvedBracketedBlockInfos(parentStringifiedType);
        for (const blockInfo of blockInfos) {
            if (blockInfo.block.includes('key:')) {
                console.log(chalk.greenBright('TEXT PROPPPPS'), blockInfo.block);
                console.log(chalk.greenBright('TEXT PROPPPPS tl noddddd'), this.getTypeLiteralProperties(typeLiteralNode));
                console.log(chalk.greenBright('TEXT PROPPPPS tl noddddd'), this.getTypeLiteralProperties(typeLiteralNode));
            }
            if (textCorrespondsToProperties(blockInfo.block, this.getTypeLiteralProperties(typeLiteralNode))) {

                if (blockInfo.block.includes('key:')) {
                    console.log(chalk.greenBright('TEXT PROPPPPS okkkkkkk'), blockInfo.block);
                }
                return blockInfo.block;
            }
        }
        throwWarning(`property signature not found in ${parentStringifiedType}`);
    }


    private static createHTLInterfaceInfo(htl: HierarchicTypeLiteral): InterfaceInfo {
        // console.log(chalk.blueBright(`PROPTXTTTT |${htl.name}|`));
        // console.log(chalk.blueBright(`PROPTXTTTT |${htl.originalStringifiedType}|`));
        const interfaceInfo = new InterfaceInfo(htl.name, sourceFilePath(htl.typeLiteralNode));
        interfaceInfo.properties = getPropertiesFromCurvedBracketed(htl.originalStringifiedType);
        return interfaceInfo;
    }


    private static isTrivialTypeLiteral(typeLiteralNode: TypeLiteralNode): boolean {
        return !typeLiteralNode.getFirstDescendantByKind(SyntaxKind.TypeLiteral);
    }


    private static getTypeLiteralAncestors(node: Node): TypeLiteralNode[] {
        const typeLiteralNodes: TypeLiteralNode[] = [];
        // console.log(chalk.greenBright('GET TL ANCESTORSSSSS'), node.getText(), node.getKindName(), node.getDescendantsOfKind(SyntaxKind.TypeLiteral).length);
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
        // this.updateParent(htl);
    }


    static getTypeLiteralProperties(typeLiteral: TypeLiteralNode): Property[] {
        console.log(chalk.cyanBright('PROPSSSSS'), typeLiteral.getProperties().map(p => p.getName()));
        if (typeLiteral.getProperties().length === 0) {
            console.log(chalk.blueBright('PROPSSSSS MEMBERS'), typeLiteral.getMembers().map(p => p.getStructure()));
        }
        let properties: Property[] = this.getClassicProperties(typeLiteral);
        properties.push(...this.getIndexableTypeProperties(typeLiteral));
        if (typeLiteral.getProperties().length === 0) {
            console.log(chalk.cyanBright('PROPSSSSS END'), properties);
        }
        return properties;
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


    private static getIndexableTypeProperties(typeLiteral: TypeLiteralNode): Property[] {
        const properties: Property[] = [];

        if (typeLiteral.getProperties().length === 0) {
            console.log(chalk.redBright('GET IDXABLEEEEE'), typeLiteral.getFirstDescendantByKind(SyntaxKind.IndexSignature)?.getStructure());
        }
            const indexSignature: IndexSignatureDeclarationStructure = typeLiteral.getFirstDescendantByKind(SyntaxKind.IndexSignature)?.getStructure();

            if (indexSignature) {
                const property: Property = {
                    initializer: undefined,
                    isRequired: true,
                    name: `[${indexSignature.keyName}: ${indexSignature.keyType}]`,
                    type: indexSignature.returnType as string
                }
                properties.push(property);
            }
        return properties;
    }


    private static updateInterfaceInfo(htl: HierarchicTypeLiteral): void {
        for (const child of htl.children) {
            this.updateParent(child, htl);
        }
    }


    private static updateParent(child: HierarchicTypeLiteral, parent: HierarchicTypeLiteral): void {
        // console.log(chalk.redBright('UPDATEEEEE PARENT props'), parent.interfaceInfo.properties);
        const blockInfo: BlockInfo = {block: child.originalStringifiedType, name: child.interfaceInfo.name};
        // console.log(chalk.redBright('UPDATEEEEE PARENT bi'), blockInfo);
        for (const property of parent.interfaceInfo.properties) {
            property.type = replaceBlocksByNames(property.type, [blockInfo]);
        }
        // console.log(chalk.redBright('UPDATEEEEEDD PARENT props'), parent.interfaceInfo.properties);
    }
}
