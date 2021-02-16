import { EnumDeclaration } from 'ts-morph';


export function isEnumValue(declaration: EnumDeclaration, value: any): boolean {
    return this.enumValues(declaration).includes(value);
}


export function enumValues(declaration: EnumDeclaration): any[] {
    return declaration.getStructure().members?.map(m => (m.initializer as string).slice(1, -1));
}
