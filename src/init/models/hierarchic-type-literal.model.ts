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
    node: PropertyDeclaration | TypeAliasDeclaration | TypeLiteralNode = undefined;
    parent: HierarchicTypeLiteral = undefined;
    root: PropertyDeclaration | TypeAliasDeclaration = undefined;

    constructor(root: PropertyDeclaration | TypeAliasDeclaration, node: PropertyDeclaration | TypeAliasDeclaration | TypeLiteralNode, parent: HierarchicTypeLiteral, childIndex?: number, isTrivial = false, children: HierarchicTypeLiteral[] = []) {
        this.root = root;
        this.isTrivial = isTrivial;
        this.children = children;
        this.childIndex = childIndex;
        this.node = node;
        this.parent = parent;
        this.setName();
        this.setInterfaceInfo();
    }


    get isRoot(): boolean {
        return !this.parent;
    }


    setName(): void {
        // TODO : if root is PropDecl, include class or interface name
        // const suffix = this.parent ? `${this.parent.name}` : `${this.parent.name.getName()}`;
        this.name = this.parent ? `${this.parent.name}_${this.childIndex}` : `${this.root.getName()}`;
    }


    setInterfaceInfo(): void {
        this.interfaceInfo = new InterfaceInfo(this.name, this.root.getSourceFile().getFilePath());
        if (this.parent) {
            this.setProperties();
            // this.interfaceInfo.stringifiedType =
        } else {
            this.interfaceInfo.stringifiedType = declarationType(this.root);
        }
    }


    private setProperties(): void {
        const stringifiedType: CurvedBracketed = this.parent.interfaceInfo.stringifiedType as CurvedBracketed;
        console.log(chalk.blueBright('SET PROPSSSS: PARENT ST'), stringifiedType);
        this.interfaceInfo.properties = getPropertiesFromCurvedBracketed(stringifiedType);
    }
}

export class HierarchicTypeLiteralNode extends HierarchicTypeLiteral {
    node: TypeLiteralNode;
}
