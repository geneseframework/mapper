import { Node } from 'ts-morph';

export function sourceFilePath(node: Node): string {
    return node?.getSourceFile()?.getFilePath();
}
