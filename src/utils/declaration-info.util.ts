import { DeclarationInfo } from '../models/declarations/declaration-info.model';
import { ClassInfo } from '../models/declarations/class-info.model';
import { InterfaceInfo } from '../models/declarations/interface-info.model';
import { EnumInfo } from '../models/declarations/enum-info.model';
import { TypeInfo } from '../models/declarations/type-info.model';

export function isClassInfo(declarationInfo: DeclarationInfo): declarationInfo is ClassInfo {
    return declarationInfo.kind === 'ClassDeclaration';
}

export function isEnumInfo(declarationInfo: DeclarationInfo): declarationInfo is EnumInfo {
    return declarationInfo.kind === 'EnumDeclaration';
}

export function isInterfaceInfo(declarationInfo: DeclarationInfo): declarationInfo is InterfaceInfo {
    return declarationInfo.kind === 'InterfaceDeclaration';
}

export function isTypeInfo(declarationInfo: DeclarationInfo): declarationInfo is TypeInfo {
    return declarationInfo.kind === 'TypeAliasDeclaration';
}
