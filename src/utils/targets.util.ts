import { Bracketed } from '../types/tuples/brackets.type';
import { Tuple } from '../types/tuples/tuple.type';
import * as chalk from 'chalk';
import { isArray } from './arrays.util';
import { tupleLength } from './tuples.util';

export function isTargetArray(target: string): target is Bracketed {
    return /^\[.*\]$/g.test(target);
}


export function isTupleOfSameLength(targetTuple: Tuple, data: any[]): boolean {
    return isArray(data) && data.length === tupleLength(targetTuple);
}


export function findTupleElement(targetTuple: Tuple, index: number): string {
    return targetTuple.slice(1, -1).split(', ')[index];
}


