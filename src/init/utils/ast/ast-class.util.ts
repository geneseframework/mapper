import { ClassDeclaration } from 'ts-morph';


/**
 * Returns the number of arguments of the constructor of a given method
 * @param classDeclaration      // The ClassDeclaration to check
 */
export function numberOfConstructorArgs(classDeclaration: ClassDeclaration): number {
    const constructorDeclarations = classDeclaration.getConstructors();
    if (!constructorDeclarations || constructorDeclarations.length === 0) {
        return 0;
    } else {
        return constructorDeclarations[0].getParameters()?.length;
    }
}

/**
 * Checks if a ClassDeclaration corresponds to a class having a private or protected constructor
 * @param classDeclaration      // The ClassDeclaration to check
 */
export function hasPrivateConstructor(classDeclaration: ClassDeclaration): boolean {
    return ['private', 'protected'].includes(classDeclaration?.getConstructors()?.[0]?.getScope());
}
