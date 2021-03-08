import { DeclarationInfo } from '../models/declarations/declaration-info.model';
import { ClassInfo } from '../models/declarations/class-info.model';

export function isClassInfo(declarationInfo: DeclarationInfo): declarationInfo is ClassInfo {
    return declarationInfo.kind === 'Class';
}
