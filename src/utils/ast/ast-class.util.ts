import { ClassDeclaration } from 'ts-morph';


// TODO : Heritage ?
export function numberOfConstructorArgs(classDeclaration: ClassDeclaration): number {
    const constructorDeclarations = classDeclaration.getConstructors();
    if (!constructorDeclarations || constructorDeclarations.length === 0) {
        return 0;
    } else {
        return constructorDeclarations[0].getParameters()?.length;
    }
}


export function hasPrivateConstructor(classDeclaration: ClassDeclaration): boolean {
    return ['private', 'protected'].includes(classDeclaration?.getConstructors()?.[0]?.getScope());
}
