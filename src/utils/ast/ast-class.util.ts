import { ClassDeclaration, HeritageClause, PropertyDeclaration, PropertySignature } from 'ts-morph';
import { SyntaxKind } from '@ts-morph/common';
import { getHeritageDeclaration } from './ast-heritage.util';
import { ClassOrInterfaceDeclaration } from '../../types/class-or-interface-declaration.type';
import { PropertyDeclarationOrSignature } from '../../types/property-declaration-or-signature.type';


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


export function getAllProperties(declaration: ClassOrInterfaceDeclaration): PropertyDeclarationOrSignature[] {
    const propertyDeclarations: PropertyDeclarationOrSignature[] = declaration.getProperties();
    const heritageClause: HeritageClause = declaration.getHeritageClauseByKind(SyntaxKind.ExtendsKeyword);
    if (heritageClause) {
        const parentClassDeclaration: ClassDeclaration = getHeritageDeclaration(heritageClause);
        if (parentClassDeclaration) {
            propertyDeclarations.push(...getAllProperties(parentClassDeclaration));
        }
    }
    return propertyDeclarations;
}


export function getAllClassProperties(classDeclaration: ClassDeclaration): PropertyDeclaration[] {
    const propertyDeclarations: PropertyDeclaration[] = classDeclaration.getProperties();
    const heritageClause: HeritageClause = classDeclaration.getHeritageClauseByKind(SyntaxKind.ExtendsKeyword);
    if (heritageClause) {
        const parentClassDeclaration: ClassDeclaration = getHeritageDeclaration(heritageClause);
        if (parentClassDeclaration) {
            propertyDeclarations.push(...getAllClassProperties(parentClassDeclaration));
        }
    }
    return propertyDeclarations;
}
