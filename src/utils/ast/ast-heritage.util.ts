import { ClassDeclaration, HeritageClause, Node } from 'ts-morph';
import { flat } from '../native/arrays.util';


export function getHeritageDeclaration(heritageClause: HeritageClause): ClassDeclaration {
    return getHeritageDeclarations(heritageClause)?.length > 0 ? getHeritageDeclarations(heritageClause)[0] : undefined;
}


export function getHeritageDeclarations(heritageClause: HeritageClause): ClassDeclaration[] {
    // const zzz: Node[][] = heritageClause.getTypeNodes().map(t => t.getType().getSymbol()?.getDeclarations());
    return flat(heritageClause.getTypeNodes().map(t => t.getType().getSymbol()?.getDeclarations() ?? []));
}
