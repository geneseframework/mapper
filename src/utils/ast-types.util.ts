import { Node } from 'ts-morph';


export function getApparentType(node: Node): string {
    return node.getType().getApparentType().getText();
}
