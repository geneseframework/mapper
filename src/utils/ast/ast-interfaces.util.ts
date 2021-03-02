import {
    ClassDeclaration,
    HeritageClause,
    InterfaceDeclaration,
    PropertyDeclaration,
    PropertySignature,
    SyntaxKind
} from 'ts-morph';
import { getHeritageDeclaration } from './ast-heritage.util';
import { getAllClassProperties } from './ast-class.util';
import { includes } from '../native/arrays.util';
import * as chalk from 'chalk';


export function getAllInterfaceProperties(interfaceDeclaration: InterfaceDeclaration): (PropertySignature | PropertyDeclaration)[] {
    const propertyDeclarations: (PropertySignature | PropertyDeclaration)[] = interfaceDeclaration.getProperties();
    const heritageClause: HeritageClause = interfaceDeclaration.getHeritageClauseByKind(SyntaxKind.ExtendsKeyword);
    if (heritageClause) {
        const parentInterfaceDeclaration: ClassDeclaration = getHeritageDeclaration(heritageClause);
        if (parentInterfaceDeclaration) {
            propertyDeclarations.push(...getAllClassProperties(parentInterfaceDeclaration));
        }
    }
    return propertyDeclarations;
}


export function implementsRequiredProperties(data: any, interfaceDeclaration: InterfaceDeclaration): boolean {
    const requiredProperties: any[] = interfaceDeclaration.getProperties().filter(p => !p.hasQuestionToken()).map(p => p.getName());
    return includes(Object.keys(data), requiredProperties);
}
