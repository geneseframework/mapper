import { Bracketed } from '../types/tuples/brackets.type';
import { Tuple } from '../types/tuples/tuple.type';
import * as chalk from 'chalk';
import { isArray } from './native/arrays.util';
import { tupleLength } from './native/tuples.util';
import { Target } from '../types/target/target.type';
import { isString } from './native/strings.util';

export function isTargetArray(target: string): target is Bracketed {
    return /^\[.*\]$/g.test(target);
}


export function isTupleOfSameLength(targetTuple: Tuple, data: any[]): boolean {
    return isArray(data) && data.length === tupleLength(targetTuple);
}


export function findTupleElement(targetTuple: Tuple, index: number): string {
    return targetTuple.slice(1, -1).split(', ')[index];
}


export function stringifyTarget(target: Target<any>): string {
    if (isString(target)) {
        return target;
    }
}


