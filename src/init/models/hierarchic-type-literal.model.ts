import { PropertyDeclaration, TypeAliasDeclaration, Node, TypeLiteralNode } from 'ts-morph';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import * as chalk from 'chalk';
import { declarationType } from '../utils/ast/ast-declaration.util';


export class HierarchicTypeLiteral {

    childIndex: number = undefined;
    children: HierarchicTypeLiteral[] = [];
    // declarationInfo
    interfaceInfo: InterfaceInfo = undefined;
    isTrivial = false;
    node: Node = undefined;
    parent: HierarchicTypeLiteral = undefined;
    root: PropertyDeclaration | TypeAliasDeclaration = undefined;
    stringifiedType: string = undefined;

    constructor(root: PropertyDeclaration | TypeAliasDeclaration, node: Node, parent: HierarchicTypeLiteral, childIndex?: number, isTrivial = false, children: HierarchicTypeLiteral[] = []) {
        this.root = root;
        this.isTrivial = isTrivial;
        this.children = children;
        this.childIndex = childIndex;
        this.node = node;
        this.parent = parent;
        this.setInterfaceInfo();
        this.setStringifiedType();
    }


    get name(): string {
        const suffix = this.parent ? `${this.parent.name}` : `${this.root.getName()}`;
        return `${suffix}_${this.childIndex}`;
    }


    setInterfaceInfo(): void {
        this.interfaceInfo = new InterfaceInfo(this.name, this.root.getSourceFile().getFilePath());
    }


    setStringifiedType(): void {
        console.log(chalk.blueBright('STRUCT TYPPPPP'), this.root.getStructure().type);
        if (!this.parent) {
            this.stringifiedType = declarationType(this.root);
        } else {

        }
    }
}

export class HierarchicTypeLiteralNode extends HierarchicTypeLiteral {
    node: TypeLiteralNode;
}
