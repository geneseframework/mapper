import { Node, SourceFile, TypeAliasDeclaration } from 'ts-morph';


export function getApparentType(node: Node): string {
    return node.getType().getApparentType().getText();
}


export function getTypeAliases(sourceFile: SourceFile): TypeAliasDeclaration[] {
    return sourceFile.getTypeAliases();
}
