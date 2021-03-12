import { ClassDeclaration, HeritageClause } from 'ts-morph';
import { flatInit } from '../native/arrays.util';

// TODO: check if needed for classes

export function getHeritageDeclaration(heritageClause: HeritageClause): ClassDeclaration {
    return getHeritageDeclarations(heritageClause)?.length > 0 ? getHeritageDeclarations(heritageClause)[0] : undefined;
}


export function getHeritageDeclarations(heritageClause: HeritageClause): ClassDeclaration[] {
    return flatInit(heritageClause.getTypeNodes().map(t => t.getType().getSymbol()?.getDeclarations() ?? []));
}
