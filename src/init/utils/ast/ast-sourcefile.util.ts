import { Node } from 'ts-morph';

/**
 * Returns the path of the SourceFile of a given Node
 * @param node      // The Node to check
 */
export function sourceFilePath(node: Node): string {
    return node?.getSourceFile()?.getFilePath();
}
