import { GLOBAL } from '../const/global.const';
import { TypeDeclarationKind } from '../../shared/types/type-declaration-kind.type';

/**
 * Checks if a text corresponds to a declaration recorded in the GLOBAL.declarationInfos array
 * @param typeName      // The text to check
 */
export function hasDeclaration(typeName: string): boolean {
    return !!declarationKind(typeName);
}

/**
 * Returns the kind of declaration corresponding to a type name
 * @param typeName      // The text to check
 */
function declarationKind(typeName: string): TypeDeclarationKind {
    if (isProjectClass(typeName)) {
        return 'Class';
    } else if (isProjectEnum(typeName)) {
        return 'Enum';
    } else if (isProjectInterface(typeName)) {
        return 'Interface';
    } else if (isProjectTypeAlias(typeName)) {
        return 'TypeAlias';
    } else {
        return undefined;
    }
}

/**
 * Checks if some text is the name of a class in GLOBAL.declarationInfos
 * @param typeName      // The text to check
 */
export function isProjectClass(typeName: string): boolean {
    return GLOBAL.classNames.includes(typeName);
}

/**
 * Checks if some text is the name of an enum in GLOBAL.declarationInfos
 * @param typeName      // The text to check
 */
export function isProjectEnum(typeName: string): boolean {
    return GLOBAL.enumNames.includes(typeName);
}

/**
 * Checks if some text is the name of an interface in GLOBAL.declarationInfos
 * @param typeName      // The text to check
 */
export function isProjectInterface(typeName: string): boolean {
    return GLOBAL.interfaceNames.includes(typeName);
}

/**
 * Checks if some text is the name of a type alias in GLOBAL.declarationInfos
 * @param typeName      // The text to check
 */
export function isProjectTypeAlias(typeName: string): boolean {
    return GLOBAL.typeNames.includes(typeName);
}
