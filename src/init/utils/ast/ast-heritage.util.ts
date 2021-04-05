import { ClassDeclaration, HeritageClause } from 'ts-morph';
import { flat } from '@genese/core';

// TODO: check if heritage must be analyzed
/**
 * Returns the first ClassDeclaration corresponding to some HeritageClause (in ts-morph)
 * @param heritageClause
 */
export function getHeritageDeclaration(heritageClause: HeritageClause): ClassDeclaration {
    return getHeritageDeclarations(heritageClause)?.length > 0 ? getHeritageDeclarations(heritageClause)[0] : undefined;
}

/**
 * Returns the array of ClassDeclaration corresponding to some HeritageClause (in ts-morph)
 * @param heritageClause
 */
export function getHeritageDeclarations(heritageClause: HeritageClause): ClassDeclaration[] {
    return flat(heritageClause.getTypeNodes().map(t => t.getType().getSymbol()?.getDeclarations() ?? []));
}
