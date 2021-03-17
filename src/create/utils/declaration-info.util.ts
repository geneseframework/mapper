import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';
import { ClassInfo } from '../../shared/models/declarations/class-info.model';
import { EnumInfo } from '../../shared/models/declarations/enum-info.model';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { TypeInfo } from '../../shared/models/declarations/type-info.model';

export function isClassInfo(declarationInfo: DeclarationInfo): declarationInfo is ClassInfo {
    return declarationInfo.kind === 'Class';
}

export function isEnumInfo(declarationInfo: DeclarationInfo): declarationInfo is EnumInfo {
    return declarationInfo.kind === 'Enum';
}

export function isInterfaceInfo(declarationInfo: DeclarationInfo): declarationInfo is InterfaceInfo {
    return declarationInfo.kind === 'Interface';
}

export function isTypeInfo(declarationInfo: DeclarationInfo): declarationInfo is TypeInfo {
    return declarationInfo.kind === 'TypeAlias';
}
