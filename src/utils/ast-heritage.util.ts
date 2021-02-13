import { ClassDeclaration, HeritageClause } from 'ts-morph';
import { flat } from './arrays.util';


export function getHeritageDeclaration(heritageClause: HeritageClause): ClassDeclaration {
    return getHeritageDeclarations(heritageClause)?.length > 0 ? getHeritageDeclarations(heritageClause)[0] : undefined;
}


export function getHeritageDeclarations(heritageClause: HeritageClause): ClassDeclaration[] {
    return flat(heritageClause.getTypeNodes().map(t => t.getType().getSymbol()?.getDeclarations() ?? []));
}
