import { PropertyDeclaration, TypeAliasDeclaration, Node, TypeLiteralNode } from 'ts-morph';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import * as chalk from 'chalk';
import { declarationType } from '../utils/ast/ast-declaration.util';
import { CurvedBracketed, getPropertiesFromCurvedBracketed } from '../../create/types/target/string/curve-bracketed.type';


export class HierarchicTypeLiteral {

    childIndex: number = undefined;
    children: HierarchicTypeLiteral[] = [];
    interfaceInfo: InterfaceInfo = undefined;
    isTrivial = false;
    name: string = undefined;
    typeLiteralNode: TypeLiteralNode = undefined;
    newStringifiedType: CurvedBracketed = undefined;
    originalStringifiedType: CurvedBracketed = undefined;
    // typeLiteralNode: PropertyDeclaration | TypeAliasDeclaration | TypeLiteralNode = undefined;
    parent: HierarchicTypeLiteral = undefined;
    // root: PropertyDeclaration | TypeAliasDeclaration = undefined;

    constructor(node: TypeLiteralNode, parent: HierarchicTypeLiteral, originalStringifiedType: CurvedBracketed, childIndex?: number, isTrivial = false, children: HierarchicTypeLiteral[] = []) {
        // this.root = root;
        this.isTrivial = isTrivial;
        this.children = children;
        this.childIndex = childIndex;
        this.typeLiteralNode = node;
        this.originalStringifiedType = originalStringifiedType;
        this.parent = parent;
        // this.setName(parentName);
        this.setInterfaceInfo();
    }


    get isRoot(): boolean {
        return !this.parent;
    }


    setName(parentName: string): void {
        // TODO : if root is PropDecl, include class or interface name
        this.name = `${parentName}_${this.childIndex}`;
        // this.name = this.parent ? `${parentName}_${this.childIndex}` : `${parentName}`;
    }


    setInterfaceInfo(): void {
        this.interfaceInfo = new InterfaceInfo(this.name, this.typeLiteralNode.getSourceFile().getFilePath());
    //     if (this.parent) {
    //         this.setProperties();
    //         // this.interfaceInfo.stringifiedType =
    //     } else {
    //         // this.interfaceInfo.stringifiedType = declarationType(this.root);
    //         console.log(chalk.redBright('SET IIIIII parent'), this.interfaceInfo.stringifiedType);
    //     }
    }
    //
    //
    // private setProperties(parentStringifiedType: string): void {
    //     const stringifiedType: CurvedBracketed = this.parent.interfaceInfo.stringifiedType as CurvedBracketed;
    //     console.log(chalk.blueBright('SET PROPSSSS: kind typeLiteralNode'), this.typeLiteralNode.getKindName());
    //     console.log(chalk.blueBright('SET PROPSSSS: PARENT ST'), stringifiedType, this.parent.originalStringifiedType);
    //     this.interfaceInfo.properties = getPropertiesFromCurvedBracketed(parentStringifiedType);
    // }
}

export class HierarchicTypeLiteralNode extends HierarchicTypeLiteral {
    typeLiteralNode: TypeLiteralNode;
}
