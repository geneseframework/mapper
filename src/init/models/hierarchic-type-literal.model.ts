import { TypeLiteralNode } from 'ts-morph';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { CurvedBracketed } from '../../create/types/containers/curve-bracketed.type';

/**
 * Used to construct the InterfaceInfos corresponding to type aliases which are defined by a TypeLiteral node
 * and classes or interfaces having properties defined by TypeLiteral nodes
 * Each HTL corresponds to a string surrounded by curved brackets in a stringified type
 * A stringified type may have multiple HTL having themselves multiples HTL children
 * More explanations on the algorithm on the ./docs/diagrams.mdj file
 */
export class HierarchicTypeLiteral {

    childIndex: number = undefined;                         // The index of a child of a given HTL
    children: HierarchicTypeLiteral[] = [];                 // The children of a given HTL
    interfaceInfo: InterfaceInfo = undefined;               // The InterfaceInfo corresponding to the HTL which will need to be added in the declaration-infos.ts generated file
    isTrivial = false;                                      // True if HTL has children, false if not
    name: string = undefined;                               // The name of the HTL
    typeLiteralNode: TypeLiteralNode = undefined;           // The Type Literal corresponding to the HTL (corresponding to a text surrounded by curved brackets)
    originalStringifiedType: CurvedBracketed = undefined;   // The text surrounded by curved brackets which defines the HTL before replacing its children blocks by new InterfaceInfo names
    parent: HierarchicTypeLiteral = undefined;              // The eventual HTL parent of the current HTL

    constructor(node: TypeLiteralNode, parent: HierarchicTypeLiteral, originalStringifiedType: CurvedBracketed, childIndex?: number, isTrivial = false, children: HierarchicTypeLiteral[] = []) {
        this.isTrivial = isTrivial;
        this.children = children;
        this.childIndex = childIndex;
        this.typeLiteralNode = node;
        this.originalStringifiedType = originalStringifiedType;
        this.parent = parent;
        this.setInterfaceInfo();
    }

    /**
     * Sets the name of the HTL
     * @param parentName    // The name of its parent
     */
    setName(parentName: string): void {
        this.name = `${parentName}_${this.childIndex}`;
    }

    /**
     * Creates the InterfaceInfo corresponding to the HTL
     */
    setInterfaceInfo(): void {
        this.interfaceInfo = new InterfaceInfo(this.name, this.typeLiteralNode.getSourceFile().getFilePath());
    }

}
