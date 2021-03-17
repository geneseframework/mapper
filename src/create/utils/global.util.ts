import { GLOBAL } from '../const/global.const';
import { TypeDeclarationKind } from '../../shared/types/type-declaration-kind.type';


export function hasDeclaration(typeName: string): boolean {
    return !!declarationKind(typeName);
}


function declarationKind(typeName: string): TypeDeclarationKind {
    if (isClassDeclaration(typeName)) {
        return 'Class';
    } else if (isEnumDeclaration(typeName)) {
        return 'Enum';
    } else if (isInterfaceDeclaration(typeName)) {
        return 'Interface';
    } else if (isTypeAliasDeclaration(typeName)) {
        return 'TypeAlias';
    } else {
        return undefined;
    }
}


export function isClassDeclaration(typeName: string): boolean {
    return GLOBAL.classNames.includes(typeName);
}


export function isEnumDeclaration(typeName: string): boolean {
    return GLOBAL.enumNames.includes(typeName);
}


export function isInterfaceDeclaration(typeName: string): boolean {
    return GLOBAL.interfaceNames.includes(typeName);
}


export function isTypeAliasDeclaration(typeName: string): boolean {
    return GLOBAL.typeNames.includes(typeName);
}
