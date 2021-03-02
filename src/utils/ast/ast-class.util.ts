import { ClassDeclaration, HeritageClause, Identifier, PropertyDeclaration, TypeReferenceNode } from 'ts-morph';
import { SyntaxKind } from '@ts-morph/common';
import { getHeritageDeclaration } from './ast-heritage.util';
import { getImportTypeDeclaration } from './ast-imports.util';
import { TypeDeclaration } from '../../types/type-declaration.type';
import { TConstructor } from '../../types/t-constructor.type';
import { isArray } from '../native/arrays.util';


export function isExportedClassConstructorArray(functions: Function[]): functions is TConstructor<any>[] {
    return isArray(functions) && functions.every(f => isExportedClassConstructor(f));
}


// TODO
export function isExportedClassConstructor(f: Function): f is TConstructor<any> {
    return true;
}


// TODO : Heritage ?
export function getNumberOfConstructorArguments(classDeclaration: ClassDeclaration): number {
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


export function getTypeReferenceTypeDeclaration(typeReference: TypeReferenceNode): TypeDeclaration {
    const identifier: Identifier = typeReference.getFirstDescendantByKind(SyntaxKind.Identifier);
    const apparentType: string = identifier.getSymbol().getDeclaredType().getApparentType().getText();
    const split: string[] = apparentType.split('.');
    const typeName: string = split[split.length - 1];
    return getImportTypeDeclaration(apparentType, typeName);
}

