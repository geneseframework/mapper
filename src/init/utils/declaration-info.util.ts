import { DeclarationInfoInit } from '../models/declarations/declaration-info.model';
import { TypeInfoInit } from '../models/declarations/type-info.model';
import { InterfaceInfoInit } from '../models/declarations/interface-info.model';
import { EnumInfoInit } from '../models/declarations/enum-info.model';
import { ClassInfoInit } from '../models/declarations/class-info.model';

export function isClassInfoInit(declarationInfo: DeclarationInfoInit): declarationInfo is ClassInfoInit {
    return declarationInfo.kind === 'Class';
}

export function isEnumInfoInit(declarationInfo: DeclarationInfoInit): declarationInfo is EnumInfoInit {
    return declarationInfo.kind === 'Enum';
}

export function isInterfaceInfoInit(declarationInfo: DeclarationInfoInit): declarationInfo is InterfaceInfoInit {
    return declarationInfo.kind === 'Interface';
}

export function isTypeInfoInit(declarationInfo: DeclarationInfoInit): declarationInfo is TypeInfoInit {
    return declarationInfo.kind === 'TypeAlias';
}
