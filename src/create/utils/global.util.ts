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

/**
 * Checks if some text is the name of a class in GLOBAL.declarationInfos
 * @param typeName      // The text to check
 */
export function isClassDeclaration(typeName: string): boolean {
    return GLOBAL.classNames.includes(typeName);
}

/**
 * Checks if some text is the name of an enum in GLOBAL.declarationInfos
 * @param typeName      // The text to check
 */
export function isEnumDeclaration(typeName: string): boolean {
    return GLOBAL.enumNames.includes(typeName);
}

/**
 * Checks if some text is the name of an interface in GLOBAL.declarationInfos
 * @param typeName      // The text to check
 */
export function isInterfaceDeclaration(typeName: string): boolean {
    return GLOBAL.interfaceNames.includes(typeName);
}

/**
 * Checks if some text is the name of a type alias in GLOBAL.declarationInfos
 * @param typeName      // The text to check
 */
export function isTypeAliasDeclaration(typeName: string): boolean {
    return GLOBAL.typeNames.includes(typeName);
}
