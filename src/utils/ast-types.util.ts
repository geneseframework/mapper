import { EnumDeclaration, Node, SourceFile } from 'ts-morph';

export function isOutOfProject(sourceFile: SourceFile): boolean {
    return !sourceFile || sourceFile.isInNodeModules() || sourceFile.isFromExternalLibrary();
}


export function isEnumValue(declaration: EnumDeclaration, value: any): boolean {
    return this.enumValues(declaration).includes(value);
}


export function enumValues(declaration: EnumDeclaration): any[] {
    return declaration.getStructure().members?.map(m => (m.initializer as string).slice(1, -1));
}


export function getApparentType(node: Node): string {
    return node.getType().getApparentType().getText();
}
