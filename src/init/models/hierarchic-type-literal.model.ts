import { TypeLiteralNode } from 'ts-morph';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { CurvedBracketed } from '../../create/types/target/string/curve-bracketed.type';


export class HierarchicTypeLiteral {

    childIndex: number = undefined;
    children: HierarchicTypeLiteral[] = [];
    interfaceInfo: InterfaceInfo = undefined;
    isTrivial = false;
    name: string = undefined;
    typeLiteralNode: TypeLiteralNode = undefined;
    originalStringifiedType: CurvedBracketed = undefined;
    parent: HierarchicTypeLiteral = undefined;

    constructor(node: TypeLiteralNode, parent: HierarchicTypeLiteral, originalStringifiedType: CurvedBracketed, childIndex?: number, isTrivial = false, children: HierarchicTypeLiteral[] = []) {
        this.isTrivial = isTrivial;
        this.children = children;
        this.childIndex = childIndex;
        this.typeLiteralNode = node;
        this.originalStringifiedType = originalStringifiedType;
        this.parent = parent;
        this.setInterfaceInfo();
    }


    setName(parentName: string): void {
        this.name = `${parentName}_${this.childIndex}`;
    }


    setInterfaceInfo(): void {
        this.interfaceInfo = new InterfaceInfo(this.name, this.typeLiteralNode.getSourceFile().getFilePath());
    }

}

export class HierarchicTypeLiteralNode extends HierarchicTypeLiteral {
    typeLiteralNode: TypeLiteralNode;
}
