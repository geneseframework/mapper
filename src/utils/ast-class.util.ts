import {
    ClassDeclaration,
    EnumDeclaration,
    HeritageClause, Identifier, ImportSpecifier,
    PropertyDeclaration,
    SourceFile,
    TypeReferenceNode
} from 'ts-morph';
import { SyntaxKind } from '@ts-morph/common';
import { getHeritageDeclaration } from './ast-heritage.util';
import * as chalk from 'chalk';


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


export function getAllProperties(classDeclaration: ClassDeclaration): PropertyDeclaration[] {
    const propertyDeclarations: PropertyDeclaration[] = classDeclaration.getProperties();
    const heritageClause: HeritageClause = classDeclaration.getHeritageClauseByKind(SyntaxKind.ExtendsKeyword);
    if (heritageClause) {
        const parentClassDeclaration: ClassDeclaration = getHeritageDeclaration(heritageClause);
        if (parentClassDeclaration) {
            propertyDeclarations.push(...getAllProperties(parentClassDeclaration));
        }
    }
    return propertyDeclarations;
}


export function getClassDeclaration(typeReference: TypeReferenceNode): ClassDeclaration {
    const identifier: Identifier = typeReference.getFirstDescendantByKind(SyntaxKind.Identifier);
    const apparentType: string = identifier.getSymbol().getDeclaredType().getApparentType().getText();
    const split: string[] = apparentType.split('.');
    const typeName: string = split[split.length - 1];
    const importSpecifier: ImportSpecifier = identifier.getSymbol().getDeclarations()[0] as ImportSpecifier;
    console.log(chalk.blueBright('APPT TYPEEEEEE'), apparentType);
    console.log(chalk.magentaBright('APPT TYPEEEEEE NAME'), typeName);
    return undefined;
}

